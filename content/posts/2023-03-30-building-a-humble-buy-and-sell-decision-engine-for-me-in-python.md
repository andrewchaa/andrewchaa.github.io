---
title: Building a humble buy and sell decision engine for me in Python
date: 2023-03-30
tags:
  - python
---

My Python skill is pretty shallow. I hope this mini project can help me deepen my understanding.


### Google colab


It’s convenient that Python packages are automatically managed in the notebook


## Buy when the price is low, and sell when the price is high


```python
import pandas as pd
import yfinance as yf
import numpy as np

start_date = pd.to_datetime('2020-01-01')
end_date = pd.to_datetime('2024-01-01')

goog_data = yf.download('GOOG', start_date, end_date)

goog_data_signal = pd.DataFrame(index=goog_data.index)
goog_data_signal['price'] = goog_data['Adj Close']
goog_data_signal['daily_difference'] = goog_data_signal['price'].diff()
goog_data_signal['signal'] = 0.0
goog_data_signal['signal'] = np.where(goog_data_signal['daily_difference'] > 0, 1.0, 0.0)
goog_data_signal['positions'] = goog_data_signal['signal'].diff()

goog_data_signal.tail(10)
```


| Date                | price               | daily\_difference   | signal | positions |
| ------------------- | ------------------- | ------------------- | ------ | --------- |
| 2023-12-15 00:00:00 | 133\.83999633789062 | 0\.6399993896484375 | 1\.0   | 1\.0      |
| 2023-12-18 00:00:00 | 137\.19000244140625 | 3\.350006103515625  | 1\.0   | 0\.0      |
| 2023-12-19 00:00:00 | 138\.10000610351562 | 0\.910003662109375  | 1\.0   | 0\.0      |
| 2023-12-20 00:00:00 | 139\.66000366210938 | 1\.55999755859375   | 1\.0   | 0\.0      |
| 2023-12-21 00:00:00 | 141\.8000030517578  | 2\.1399993896484375 | 1\.0   | 0\.0      |
| 2023-12-22 00:00:00 | 142\.72000122070312 | 0\.9199981689453125 | 1\.0   | 0\.0      |
| 2023-12-26 00:00:00 | 142\.82000732421875 | 0\.100006103515625  | 1\.0   | 0\.0      |
| 2023-12-27 00:00:00 | 141\.44000244140625 | -1\.3800048828125   | 0\.0   | -1\.0     |
| 2023-12-28 00:00:00 | 141\.27999877929688 | -0\.160003662109375 | 0\.0   | 0\.0      |
| 2023-12-29 00:00:00 | 140\.92999267578125 | -0\.350006103515625 | 0\.0   | 0\.0      |

- High: The highest price of the stock on that trading day.
- Low: The lowest price of the stock on that trading day.
- Close: The price of the stock at closing time.
- Open: The price of the stock at the beginning of the trading day (closing price of the previous trading day).
- Volume: How many stocks were traded.
- Adj Close: The closing price of the stock that adjusts the price of the stock for corporate actions. This price takes into account the stock splits and dividends.
- I used `yf.download()` as `pd.DataReader` has compatibility issue with yahoo finance api

### Visualise it


```python
import pandas as pd
import yfinance as yf
import numpy as np
import matplotlib.pyplot as plt

start_date = pd.to_datetime('2020-01-01')
end_date = pd.to_datetime('2024-01-01')

goog_data = yf.download('GOOG', start_date, end_date)

goog_data_signal = pd.DataFrame(index=goog_data.index)
goog_data_signal['price'] = goog_data['Adj Close']
goog_data_signal['daily_difference'] = goog_data_signal['price'].diff()
goog_data_signal['signal'] = 0.0
goog_data_signal['signal'] = np.where(goog_data_signal['daily_difference'] > 0, 1.0, 0.0)
goog_data_signal['positions'] = goog_data_signal['signal'].diff()

fig = plt.figure()
ax1 = fig.add_subplot(111, ylabel='Google price in $')

goog_data_signal['price'].plot(ax=ax1, color='r', lw=2.)
ax1.plot(goog_data_signal.loc[goog_data_signal.positions == 1.0].index, 
         goog_data_signal.price[goog_data_signal.positions == 1.0],
         '^', markersize=5, color='m')
ax1.plot(goog_data_signal.loc[goog_data_signal.positions == -1.0].index,
         goog_data_signal.price[goog_data_signal.positions == -1.0],
         'v', markersize=5, color='k')
plt.show()
```


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/1cb648e5-ebfb-4420-b80a-e03da881e6e8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240106%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240106T012602Z&X-Amz-Expires=3600&X-Amz-Signature=4452065a2680b37bd1637711b18c5ea7a77e089a17a4163db52762af6371af0a&X-Amz-SignedHeaders=host&x-id=GetObject)


### Use SMA 5 and SMA 10


```python
import numpy as np
import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt


def get_nasdaq_data():
    nasdaq = yf.Ticker("^IXIC")
    nasdaq_data = nasdaq.history(period="3mo", interval="1d")
    nasdaq_data.to_csv("nasdaq.csv")
    return nasdaq_data


def calculate_sma(data, period):
    sma = data["Close"].rolling(window=period).mean()
    return sma


def generate_signals(data):
    data["5_SMA"] = calculate_sma(data, 5)
    data["10_SMA"] = calculate_sma(data, 10)

    data["Signal"] = None
    for i in range(len(data)):
        if data["5_SMA"][i] > data["10_SMA"][i]:
            data["Signal"][i] = 'Buy'
        else:
            data["Signal"][i] = 'Sell'

    return data


def plot_graph(data):
    buy_signals = data[data['Signal'] == 'Buy']
    sell_signals = data[data['Signal'] == 'Sell']

    plt.figure(figsize=(15, 10))
    plt.plot(data.index, data["Close"], label="Nasdaq", alpha=0.5)
    plt.plot(data.index, data["5_SMA"],
             label="5 Day SMA", linestyle="--", alpha=0.7)
    plt.plot(data.index, data["10_SMA"],
             label="10 Day SMA", linestyle="--", alpha=0.7)
    plt.title("Nasdaq Buy/Sell Signals using 5 and 10 Day SMA")
    plt.scatter(buy_signals.index, data.loc[buy_signals.index]
                ['Close'], marker='^', color='g', label='Buy Signal')
    plt.scatter(sell_signals.index, data.loc[sell_signals.index]
                ['Close'], marker='v', color='r', label='Sell Signal')
    plt.xlabel("Date")
    plt.ylabel("Close Price ($)")
    plt.legend()
    plt.show()


def get_latest_signal(data):
    return data["Signal"][-1]


if __name__ == "__main__":
    data = get_nasdaq_data()
    data_with_signals = generate_signals(data)

    latest_signal = get_latest_signal(data_with_signals)
    print(f"Latest Signal: {latest_signal}")
    plot_graph(data_with_signals)
```


The above code is my attempt to create buy-sell signals using SMA (Simple Moving Average) 5 and SMA 10. My next one is using EMA


### EMA Signals


```python
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import yfinance as yf


def get_nasdaq_data():
    nasdaq = yf.Ticker("^IXIC")
    nasdaq_data = nasdaq.history(period="3mo", interval="1d")
    return nasdaq_data


def get_signals(df):
    short_window = 5
    long_window = 15
    alpha = 0.1
    signals = pd.DataFrame(index=df.index)

    signals['ema_signal'] = 0.0
    signals['ema'] = df['Close'].ewm(alpha=alpha, adjust=False).mean()
    signals['ema_positions'] = 0.0
    signals['short_mavg'] = df['Close'].rolling(window=short_window,
                                                min_periods=1,
                                                center=False).mean()
    signals['long_mavg'] = df['Close'].rolling(window=long_window,
                                               min_periods=1,
                                               center=False).mean()
    signals['sma_positions'] = 0.0

    signals['ema_signal'] = np.where(signals['ema'] < df['Close'], 1.0, 0.0)
    signals['ema_positions'] = signals['ema_signal'].diff()
    return signals


def get_figure(df, signals):
    fig = plt.figure(figsize=(12, 10))
    ax1 = fig.add_subplot(111, ylabel='Price in $')

    df.loc['2018-01-01':, 'Close'].plot(ax=ax1,
                                        color='r', lw=2., label='Close Price')
    signals.loc[:, 'ema'].plot(ax=ax1, lw=2.)

    # Plot the buy signals
    ax1.plot(signals.loc[signals.ema_positions == 1.0].index,
             signals.ema[signals.ema_positions == 1.0],
             '^', markersize=10, color='g')

    # Plot the sell signals
    ax1.plot(signals.loc[signals.ema_positions == -1.0].index,
             signals.ema[signals.ema_positions == -1.0],
             'v', markersize=10, color='r')

    plt.legend()
    return fig


df = get_nasdaq_data()
signals = get_signals(df)
chart = get_figure(df, signals)

chart.savefig('signals.png')
print(signals.tail())

# plt.show()
```


### alpha factor


By the way, **`alpha`** is a smoothing factor that determines the rate at which the EMA reacts to new price data. It typically ranges between 0 and 1. A smaller **`alpha`** value results in a slower reaction to new price data, meaning the EMA will be less sensitive to recent price changes and more influenced by historical prices. Conversely, a larger **`alpha`** value will make the EMA react more quickly to new price data, giving more weight to recent price changes.


### Import another file


To import another Python file, you can use the **`import`** statement followed by the filename without the **`.py`** extension. For example, if you have a Python file named **`other_file.py`**, you can import it in your current script like this:


```python
import other_file
```


Once you've imported the file, you can access its functions, classes, and variables using the dot notation. For example, if **`other_file.py`** contains a function named **`my_function`**, you can call it like this:


```python
other_file.my_function()
```


Keep in mind that the file you want to import should be in the same directory as your current script or in a directory listed in your Python's **`sys.path`**. If the file is in a different directory, you can add that directory to **`sys.path`** like this:


```python
import sys
sys.path.append('/path/to/directory')
import other_file
```


Replace **`/path/to/directory`** with the path to the directory containing **`other_file.py`**. After adding the directory to **`sys.path`**, you can import and use the file as usual


### Building and testing Python with Github actions


[https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python)


### Send email using sendgrid


Install `sendgrid` library.


```python
pip install sendgrid
```


