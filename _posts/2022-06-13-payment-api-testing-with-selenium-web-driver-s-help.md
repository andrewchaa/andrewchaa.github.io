---
title: Payment API Testing with Selenium WebDriver’s help
date: 2022-06-13T13:58:00.000Z
tags:
  - webdriver
  - e2e test
---

Typical API E2E tests consist of pure service-side API calls. You have a list of endpoints to call and and then to verify the responses of them. More stable than Web UI tests as you don’t render any HTML in the browser. They are faster as well because JSON is light-weight. 

Recently, I wrote API tests for payment flow. The tricky part was to handle the testing of [iDEAL payment](https://www.ideal.nl/en/consumers/what-is-ideal/) flow. It’s the dominant payment option in Netherland and let you make a payment by transferring the fund from your bank account to the merchant account using your banking app. So, the payment flow has some part of pure UI journey from your payment page to the banking site. 

- `/payment` api call

- user gets redirected to [`https://some-banking-website`](https://some-banking-website) by iDEAL

- user return to the main website with return-url

- `/additional-payment` api call

For #2 and #3 parts, Selenium WebDriver can simulate the user journey. 

```c#
public class IdealClient
{
  private readonly ITestOutputHelper _testOutputHelper;
  private readonly ILogger _logger;

  public IdealClient(ITestOutputHelper testOutputHelper, ILogger logger)
  {
      _testOutputHelper = testOutputHelper;
      _logger = logger;
  }
  
  public Result<string> ConfirmPayment(string idealRedirectUrl, string webReturnUrlHost)
  {
    var chromeOptions = new ChromeOptions();
    chromeOptions.AddArgument("window-size=1920,1080");
    chromeOptions.AddArgument("disable-infobars");
    chromeOptions.AddArgument("headless");
    chromeOptions.AddArgument("--no-sandbox");
    chromeOptions.AddArgument("--disable-gpu");
    chromeOptions.AddArgument("--disable-dev-shm-usage");
    chromeOptions.AddArgument("--disable-web-security");

    var currentDomainBaseDirectory = AppDomain.CurrentDomain.BaseDirectory;
    using var driver = new ChromeDriver(currentDomainBaseDirectory, chromeOptions);

    try
    {
        driver.Navigate().GoToUrl(idealRedirectUrl);
        driver.CompleteIdealOrder(webReturnUrlHost);
        return HttpUtility
            .ParseQueryString(new Uri(driver.Url).Query)
            .Get("redirectResult");
    }
    catch (Exception exception)
    {
        driver.TakeScreenshot("error", _testOutputHelper);

        _logger.Error(exception, "Failed to confirm iDEAl payment. Current URL is: {CurrentUrl}", 
            driver.Url);
        return new Error(HttpStatusCode.InternalServerError, exception.Message);
    }
    finally
    {
        driver.Close();
    }
}
}

public static class WebDriverExtensions
{
  public static void CompleteIdealOrder(this IWebDriver driver, string returnUrlHost)
  {
      driver.WaitForElementVisible(By.Name("button.edit"));
      driver.FindElement(By.Name("button.edit")).Click();
      driver.WaitForRouteChange(returnUrlHost);
  }

  private static void WaitForElementVisible(this IWebDriver driver, By elementLocator, int timeoutInSeconds = 20)
  {
      var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(timeoutInSeconds));
      wait.IgnoreExceptionTypes(typeof(NoSuchElementException));
      wait.Until(d => d.FindElement(elementLocator).Displayed);
  }

  private static void WaitForRouteChange(this IWebDriver driver, string url, int timeoutInSeconds = 20)
  {
      var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(timeoutInSeconds));
      wait.Until(d => d.Url.ToLowerInvariant().StartsWith(url.ToLowerInvariant()));
  }

  public static void TakeScreenshot(this IWebDriver driver, string fileNamePrefix, ITestOutputHelper testOutputHelper)
  {
      var type = testOutputHelper.GetType();
      var testMember = type.GetField("test", BindingFlags.Instance | BindingFlags.NonPublic);
      var test = testMember?.GetValue(testOutputHelper) as ITest;
      var fileNameSuffix = test?.DisplayName ?? Guid.NewGuid().ToString();
      var fileName = $"{fileNamePrefix}-{fileNameSuffix}.jpeg";
      
      var directoryName = Path.Join(AppDomain.CurrentDomain.BaseDirectory, "e2e", "screenshots");
      if (!Directory.Exists(directoryName))
      {
          Directory.CreateDirectory(directoryName);
      }

      File.WriteAllBytes(Path.Join(directoryName, fileName), driver.TakeScreenshot().AsByteArray);
  }
}
```

