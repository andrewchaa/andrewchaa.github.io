---
title: Building a humble buy and sell decision engine for me in Python
date: 2023-03-30
tags:
  - python
---

My Python skill is pretty shallow. I hope this mini project can help me deepen my understanding.


## Resources

- [Learn Algorithmic Trading source code](https://github.com/PacktPublishing/Learn-Algorithmic-Trading)

## Google colab


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


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/1cb648e5-ebfb-4420-b80a-e03da881e6e8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240216T012302Z&X-Amz-Expires=3600&X-Amz-Signature=8f0bde0818aefcd4af59207669addfd442e28b463b58a76f22d0653ca9fde040&X-Amz-SignedHeaders=host&x-id=GetObject)


### Backtesting


Backtesting is a key phase to get statistics showing how effective the trading strategy is.

- **Profit and loss** (**P and** **L**): The money made by the strategy without transaction fees.
- **Net profit and loss** (**net P** **and L**): The money made by the strategy with transaction fees.
- **Exposure**: The capital invested.
- **Number of trades**: The number of trades placed during a trading session.
- **Annualised** **return**: This is the return for a year of trading.
- **Sharpe ratio**: The risk-adjusted return. This is important because it compares the return of the strategy with a risk-free strategy.

```python
import pandas as pd
import yfinance as yf
import numpy as np
import matplotlib.pyplot as plt

start_date = pd.to_datetime('2021-01-01')
end_date = pd.to_datetime('2024-01-01')

goog_data = yf.download('GOOG', start_date, end_date)

goog_data_signal = pd.DataFrame(index=goog_data.index)
goog_data_signal['price'] = goog_data['Adj Close']
goog_data_signal['daily_difference'] = goog_data_signal['price'].diff()
goog_data_signal['signal'] = 0.0
goog_data_signal['signal'] = np.where(goog_data_signal['daily_difference'] > 0, 1.0, 0.0)
goog_data_signal['positions'] = goog_data_signal['signal'].diff()


initial_capital = float(1000.0)

positions = pd.DataFrame(index=goog_data_signal.index).fillna(0.0)
portfolio = pd.DataFrame(index=goog_data_signal.index).fillna(0.0)

positions['GOOG'] = goog_data_signal['signal']
portfolio['positions'] = (positions.multiply(goog_data_signal['price'], axis=0))
portfolio['cash'] = initial_capital - (positions.diff().multiply(goog_data_signal['price'], axis=0)).cumsum()
portfolio['total'] = portfolio['positions'] + portfolio['cash']

# portfolio.tail(100)

portfolio.plot()
plt.show()
```


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/dcc21c55-8215-4a9c-a8fa-66efe8cb1541/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240216T012302Z&X-Amz-Expires=3600&X-Amz-Signature=f53b30bb63524de83e8afabfd30171bc573b05f5553e4c9bf340821c55545450&X-Amz-SignedHeaders=host&x-id=GetObject)


As you can see, this strategy is not very profitable


## Exponential Moving Average


The exponential moving average, EMA, is similar to the simple moving average, but, instead of weighing all prices in the history equally, it places more weight on the most recent price observation and less weight on the older price observations. 


There two different types of EMAs. 

- Fast EMA: converges to new price observations faster and forgets older observations faster
- Slow EMA: converges to new price observations slower and forgets old observations slower.

```shell
EMA = ( P - EMAp ) * K + EMAp

Where:

P = Price for the current period
EMAp = the Exponential moving Average for the previous period
K = the smoothing constant, equal to 2 / (n + 1)
n = the number of periods in a simple moving average roughly approximated by the EMA
```


### Implementation of the EMA


```python
import pandas as pd
import yfinance as yf

start_date = pd.to_datetime('2021-01-01')
end_date = pd.to_datetime('2024-01-01')

goog_data = yf.download('GOOG', start_date, end_date)
close = goog_data['Close']

'''
EMA = ( P - EMAp ) * K + EMAp

Where:

P = Price for the current period
EMAp = the Exponential moving Average for the previous period
K = the smoothing constant, equal to 2 / (n + 1)
n = the number of periods in a simple moving average roughly approximated by the EMA
'''

num_periods = 20 # number of days over which to average
K = 2 / (num_periods + 1) # smoothing constant
ema_p = 0

ema_values = [] # to hold computed EMA values

for close_price in close:
  if (ema_p == 0):
    ema_p = close_price
  else:
    ema_p = (close_price - ema_p) * K + ema_p

  ema_values.append(ema_p)

goog_data = goog_data.assign(ClosePrice=pd.Series(close, index=goog_data.index))
goog_data = goog_data.assign(Exponential20DayMovingAverage=pd.Series(ema_values, index=goog_data.index))

close_price = goog_data['ClosePrice']
ema = goog_data['Exponential20DayMovingAverage']

import matplotlib.pyplot as plt

fig = plt.figure()
ax1 = fig.add_subplot(111, ylabel='Google price in $')
close_price.plot(ax=ax1, color='g', lw=2., legend=True)
ema.plot(ax=ax1, color='b', lw=2., legend=True)
plt.show()
```


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/e3674cc0-6def-4621-8c9f-36c7fb232641/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240216T012302Z&X-Amz-Expires=3600&X-Amz-Signature=e04f6ddcf32f160dc9b24bb8189a605f9ca09f48b114ff21592dcd202762f050&X-Amz-SignedHeaders=host&x-id=GetObject)


### Backtesting EMA


```python
import pandas as pd
import yfinance as yf
import numpy as np

start_date = pd.to_datetime('2023-07-01')
end_date = pd.to_datetime('2024-01-01')

goog_data = yf.download('GOOG', start_date, end_date)
close = goog_data['Close']

'''
EMA = ( P - EMAp ) * K + EMAp

Where:

P = Price for the current period
EMAp = the Exponential moving Average for the previous period
K = the smoothing constant, equal to 2 / (n + 1)
n = the number of periods in a simple moving average roughly approximated by the EMA
'''

num_periods = 20 # number of days over which to average
K = 2 / (num_periods + 1) # smoothing constant
ema_p = 0

ema_values = [] # to hold computed EMA values

for close_price in close:
  if (ema_p == 0):
    ema_p = close_price
  else:
    ema_p = (close_price - ema_p) * K + ema_p

  ema_values.append(ema_p)

goog_data = goog_data.assign(ClosePrice=pd.Series(close, index=goog_data.index))
goog_data = goog_data.assign(Ema20=pd.Series(ema_values, index=goog_data.index))
goog_data['Signal'] = np.where(goog_data['ClosePrice'] > goog_data['Ema20'], 1.0, 0.0)
goog_data['Position'] = goog_data['Signal'].diff()

initial_capital = float(1000.0)

positions = pd.DataFrame(index=goog_data.index).fillna(0.0)
portfolio = pd.DataFrame(index=goog_data.index).fillna(0.0)

positions['GOOG'] = goog_data['Signal']
portfolio['Signal'] = goog_data['Signal']
portfolio['Price'] = goog_data['ClosePrice']
portfolio['Positions'] = (positions.multiply(goog_data['ClosePrice'], axis=0))
portfolio['Cash'] = initial_capital - (positions.diff().multiply(goog_data['ClosePrice'], axis=0)).cumsum()
portfolio['Total'] = portfolio['Positions'] + portfolio['Cash']

portfolio.tail(100)
# goog_data.tail(100)
```


The last 6 month result is poor. It started with 1,000 capital and end with 990.6


| Date                | Signal | Price               | Positions           | Cash               | Total              |
| ------------------- | ------ | ------------------- | ------------------- | ------------------ | ------------------ |
| 2023-12-05 00:00:00 | 0\.0   | 132\.38999938964844 | 0\.0                | 990\.6200256347656 | 990\.6200256347656 |
| 2023-12-06 00:00:00 | 0\.0   | 131\.42999267578125 | 0\.0                | 990\.6200256347656 | 990\.6200256347656 |
| 2023-12-07 00:00:00 | 1\.0   | 138\.4499969482422  | 138\.4499969482422  | 852\.1700286865234 | 990\.6200256347656 |
| 2023-12-08 00:00:00 | 1\.0   | 136\.63999938964844 | 136\.63999938964844 | 852\.1700286865234 | 988\.8100280761719 |
| 2023-12-11 00:00:00 | 0\.0   | 134\.6999969482422  | 0\.0                | 986\.8700256347656 | 986\.8700256347656 |
| 2023-12-12 00:00:00 | 0\.0   | 133\.63999938964844 | 0\.0                | 986\.8700256347656 | 986\.8700256347656 |
| 2023-12-13 00:00:00 | 0\.0   | 133\.97000122070312 | 0\.0                | 986\.8700256347656 | 986\.8700256347656 |
| 2023-12-14 00:00:00 | 0\.0   | 133\.1999969482422  | 0\.0                | 986\.8700256347656 | 986\.8700256347656 |
| 2023-12-15 00:00:00 | 0\.0   | 133\.83999633789062 | 0\.0                | 986\.8700256347656 | 986\.8700256347656 |
| 2023-12-18 00:00:00 | 1\.0   | 137\.19000244140625 | 137\.19000244140625 | 849\.6800231933594 | 986\.8700256347656 |
| 2023-12-19 00:00:00 | 1\.0   | 138\.10000610351562 | 138\.10000610351562 | 849\.6800231933594 | 987\.780029296875  |
| 2023-12-20 00:00:00 | 1\.0   | 139\.66000366210938 | 139\.66000366210938 | 849\.6800231933594 | 989\.3400268554688 |
| 2023-12-21 00:00:00 | 1\.0   | 141\.8000030517578  | 141\.8000030517578  | 849\.6800231933594 | 991\.4800262451172 |
| 2023-12-22 00:00:00 | 1\.0   | 142\.72000122070312 | 142\.72000122070312 | 849\.6800231933594 | 992\.4000244140625 |
| 2023-12-26 00:00:00 | 1\.0   | 142\.82000732421875 | 142\.82000732421875 | 849\.6800231933594 | 992\.5000305175781 |
| 2023-12-27 00:00:00 | 1\.0   | 141\.44000244140625 | 141\.44000244140625 | 849\.6800231933594 | 991\.1200256347656 |
| 2023-12-28 00:00:00 | 1\.0   | 141\.27999877929688 | 141\.27999877929688 | 849\.6800231933594 | 990\.9600219726562 |
| 2023-12-29 00:00:00 | 1\.0   | 140\.92999267578125 | 140\.92999267578125 | 849\.6800231933594 | 990\.6100158691406 |


### Strategy that uses MACD


### Python Implementation


```python
# MACD Strategy
import pandas as pd
import pandas_datareader as pdr
import matplotlib.pyplot as plt
from datetime import datetime
import yfinance as yf

# Fetch stock data
def fetch_stock_data(ticker, start, end):
    return yf.download(ticker, start, end)

# Calculate MACD
def calculate_macd(data, short_window=12, long_window=26, signal_window=9):
    data['EMA_short'] = data['Close'].ewm(span=short_window, adjust=False).mean()
    data['EMA_long'] = data['Close'].ewm(span=long_window, adjust=False).mean()
    data['MACD'] = data['EMA_short'] - data['EMA_long']
    data['Signal_Line'] = data['MACD'].ewm(span=signal_window, adjust=False).mean()

# Generate trading signals (buy=1 , sell=-1, do nothing=0)
def generate_signals(data):
    data['Signal'] = 0
    data['Signal'][data['MACD'] > data['Signal_Line']] = 1
    data['Signal'][data['MACD'] < data['Signal_Line']] = -1
    data['Position'] = data['Signal'].diff()

# Backtesting the strategy
def backtest_strategy(data):
    initial_capital= float(100000.0)
    positions = pd.DataFrame(index=data.index).fillna(0.0)
    portfolio = pd.DataFrame(index=data.index).fillna(0.0)
    
    # Buy a 100 shares
    positions['Stock'] = 100*data['Signal']  
    portfolio['positions'] = (positions.multiply(data['Close'], axis=0))
    portfolio['cash'] = initial_capital - (positions.diff().multiply(data['Close'], axis=0)).cumsum()
    portfolio['total'] = portfolio['positions'] + portfolio['cash']

    # Calculate daily returns
    portfolio['returns'] = portfolio['total'].pct_change()

    return portfolio

# Calculate the Sharpe Ratio
def calculate_sharpe_ratio(portfolio):
    # Assuming risk-free rate = 0 for simplicity
    risk_free_rate = 0
    sharpe_ratio = (portfolio['returns'].mean() - risk_free_rate) / portfolio['returns'].std()
    # Annualize the Sharpe ratio
    sharpe_ratio_annualized = (252**0.5) * sharpe_ratio
    return sharpe_ratio_annualized

# Main execution function
def run_strategy(ticker):
    start_date = '2023-06-09'
    end_date = datetime.now().strftime('%Y-%m-%d')

    data = fetch_stock_data(ticker, start_date, end_date)
    calculate_macd(data)
    generate_signals(data)

    portfolio = backtest_strategy(data)
    sharpe_ratio = calculate_sharpe_ratio(portfolio)

    # Plot the results
    plt.figure(figsize=(10,6))
    plt.plot(data['Close'], label='Close Price', alpha=0.5)
    plt.plot(data['EMA_short'], label='12-day EMA', alpha=0.5)
    plt.plot(data['EMA_long'], label='26-day EMA', alpha=0.5)
    plt.plot(data['MACD'], label='MACD', alpha=0.5)
    plt.plot(data['Signal_Line'], label='Signal Line', alpha=0.5)
    plt.scatter(data.index, data['Position'], label='Buy Signal', marker='^', color='green', alpha=1)
    plt.scatter(data.index, data['Position'], label='Sell Signal', marker='v', color='red', alpha=1)
    plt.title(f'MACD Strategy: {ticker}')
    plt.legend()
    plt.show()

    plt.figure(figsize=(10,6))
    plt.plot(portfolio['total'], label='Portfolio Value')
    plt.title('Portfolio Performance')
    plt.legend()
    plt.show()

    print(f"Sharpe Ratio: {sharpe_ratio}")

# Run the strategy for a given stock
run_strategy('AAPL')
```


### Output and Backtesting


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/f2ea385e-af8c-4b2b-8fd9-912b288e0db3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240216T012302Z&X-Amz-Expires=3600&X-Amz-Signature=1a062ad04c034a9458b66f9e6d92310ffee66acc7bd2a91f64800d6d235b6994&X-Amz-SignedHeaders=host&x-id=GetObject)


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/582e9c14-56b3-446c-b444-bdaff17bc967/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240216T012302Z&X-Amz-Expires=3600&X-Amz-Signature=4244c8a69360fc7ab772d01a1a7cc0ff174c3be121954e1403f7438accf49a0d&X-Amz-SignedHeaders=host&x-id=GetObject)


The result is not very impressive and the Sharpe Ratio is `0.336`, which is moderate. The following is the typical Sharpe Ratios of other strategies.


| **Strategy**             | **Average Sharpe Ratio** |
| ------------------------ | ------------------------ |
| Buy and Hold             | 0.2-0.4                  |
| Moving Average Crossover | 0.3-0.5                  |
| MACD (Your Strategy)     | 0.3363                   |
| RSI                      | 0.4-0.6                  |
| Momentum                 | 0.5-0.7                  |


