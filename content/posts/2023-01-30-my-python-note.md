---
title: My Python Note
date: 2023-01-30
tags:
  - python
  - code-snippets
---
This is the collection of my python code snippets and commands I use. My main programming languages are C#, JavaScript / TypeScript, and Java. I use Python to analyse and back-test my trading strategies.

## Getting Started
### Exit the Python shell
```python
exit()
```

### pip
```bash
pip install --upgrade pip # update pip
pip install yfinance pandas-datareader # install packages
```

## DataFrame
### Convert column to datetime column and set index
```python
df['Datetime'] = pd.to_datetime(df['Datetime'], utc=True)
df.set_index('Datetime', inplace=True)
```

### Remove missing values
```python
df = df.dropna(subset=['MACDh_12_26_9', 'ATR'])
```
The `dropna` function in pandas is used to remove missing values (NaN or None) from a DataFrame. 

You can use it in several ways:
- `df.dropna()`: This will drop all rows in which any null value is present.
- `df.dropna(axis=1)`: This will drop all columns with null values.
- `df.dropna(how='all')`: This will drop rows where all columns are null.
- `df.dropna(subset=['column_name'])`: This will drop rows where null values are present in specific columns.

### Remove rows with the same valule
```python
df=df[df.High!=df.Low]
```

## numpy
### Check if `nan`
```python
stopLossAtr = self.slCoefficient * 
	(self.data.ATR[-1] if not np.isnan(self.data.ATR[-1]) else 6)
```

## yfinance

### Download data
```python
import yfinance as yf
from datetime import date

tickerSymbol = 'SPGI'
tickerData = yf.Ticker(tickerSymbol)
tickerDf = tickerData.history(
  period='60d',
  interval='15m'
)

# See the data
print(tickerDf)
tickerDf.to_csv(f"data/{tickerSymbol.lower()}.csv")
```


```python
import pandas as pd
import yfinance as yf

df_apple = yf.download('AAPL', 
    start='2011-01-01',
    end='2020-09-30',
    progress=False)

print(df_apple.head())
```


Download the Apple EOD pricing data in a dataframe using pandas DataReader


Pick at the data using `.head()`


```bash
import pandas_datareader.data as pdr

df_apple = pdr.DataReader('AAPL', 
    'quandl',
    '2011-01-01',
    '2020-09-30',
    api_key='yuqp72Y_-GpAsrjQEXfL')

print(df_apple.head())
print(df_apple.info())
```


Visualise the Adjusted Close value


```bash
import pandas_datareader.data as pdr
import matplotlib.pyplot as plt

df_apple = pdr.DataReader('AAPL', 
    'quandl',
    '2011-01-01',
    '2020-09-30',
    api_key='yuqp72Y_-GpAsrjQEXfL')

fig = plt.figure()
plt = df_apple['AdjClose'].plot()
fig.savefig('close_plot.png')
```


Calculate simple return and log return


```bash
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv("./apple_stock_eod_prices.csv", 
    parse_dates=True,
    header=0,
    index_col=0)

df['simple_return'] = df['Adj_Close'].pct_change()
df['log_return'] = np.log(df['Adj_Close']/df['Adj_Close'].shift(1))

print(df.head())
```


Calculate Simple Daily Cumulative Returns


```bash
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv("./apple_stock_eod_prices.csv", 
    parse_dates=True,
    header=0,
    index_col=0)

df['simple_return'] = df['Adj_Close'].pct_change()
df['log_return'] = np.log(df['Adj_Close']/df['Adj_Close'].shift(1))
df['cum_daily_return'] = (1 + df['simple_return']).cumprod()

print(df.head())
print(df.tail())
```


Plot Simple Daily Cumulative Returns


```bash
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv("./apple_stock_eod_prices.csv", 
    parse_dates=True,
    header=0,
    index_col=0)

df['simple_return'] = df['Adj_Close'].pct_change()
df['log_return'] = np.log(df['Adj_Close']/df['Adj_Close'].shift(1))
df['cum_daily_return'] = (1 + df['simple_return']).cumprod()

print(df.head())
print(df.tail())

fig = plt.figure()
plt = df['cum_daily_return'].plot(figsize=(12,8))
fig.savefig('cumulative_return.png')
```


Moving averages


```bash
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('./apple_stock_eod_prices.csv',
    parse_dates=True,
    header=0,
    index_col=0)

adj_close_px = df['Adj_Close']
moving_avg = adj_close_px.rolling(window=40).mean()

df['sma_40'] = adj_close_px.rolling(window=40).mean()
df['sma_252'] = adj_close_px.rolling(window=252).mean()
df['cma'] = adj_close_px.expanding().mean()

fig, ax = plt.subplots(nrows=1, ncols=1)
df[['Adj_Close', 'sma_40', 'sma_252', 'cma']].plot(figsize=(12,8), ax=ax)
fig.savefig('moving_avg.png')

print(df.tail())
```


Exponential Moving Average


```bash
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('./apple_stock_eod_prices.csv',
    parse_dates=True,
    header=0,
    index_col=0)

adj_close_px = df['Adj_Close']
moving_avg = adj_close_px.rolling(window=40).mean()

df['ewma_alpha_0.1'] = adj_close_px.ewm(alpha=0.1, adjust=False).mean()
df['ewma_alpha_0.5'] = adj_close_px.ewm(alpha=0.5, adjust=False).mean()

fig, ax = plt.subplots(nrows=1, ncols=1)

df.loc['2018-01-01':,['Adj_Close', 'ewma_alpha_0.1', 'ewma_alpha_0.5']].plot(figsize=(12,8),ax=ax)
fig.savefig('exp_moving_avg.png')
```


Volatility


```bash
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('./apple_stock_eod_prices.csv',
    parse_dates=True,
    header=0,
    index_col=0)

adj_close_px = df['Adj_Close']
moving_avg = adj_close_px.rolling(window=40).mean()

df['ewma_alpha_0.1'] = adj_close_px.ewm(alpha=0.1, adjust=False).mean()
df['ewma_alpha_0.5'] = adj_close_px.ewm(alpha=0.5, adjust=False).mean()

min_periods = 75
vol = adj_close_px.rolling(min_periods).std() * np.sqrt(min_periods)

fig, ax = plt.subplots(nrows=1, ncols=1)
vol.plot(figsize=(10, 8), ax=ax)
fig.savefig('vol.png')
```


EMA signals


```typescript
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('apple_stock_eod_prices.csv', 
    parse_dates=True, header=0, index_col=0)

short_window = 50
long_window = 120
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

signals['ema_signal'] = np.where(signals['ema'] > df['Close'], 1.0, 0.0)
signals['ema_positions'] = signals['ema_signal'].diff()

fig = plt.figure(figsize=(12,10))
ax1 = fig.add_subplot(111, ylabel='Price in $')
signals2 = signals.loc['2018-01-01':,:]

df.loc['2018-01-01':,'Close'].plot(ax=ax1, color='r', lw=2., label='Close Price')
signals2.loc[:,'ema'].plot(ax=ax1, lw=2.)

# Plot the buy signals
ax1.plot(signals2.loc[signals2.ema_positions == 1.0].index,
         signals2.ema[signals2.ema_positions == 1.0],
         'o', markersize=10, color='r')

# Plot the sell signals
ax1.plot(signals2.loc[signals2.ema_positions == -1.0].index,
         signals2.ema[signals2.ema_positions == -1.0],
         '^', markersize=10, color='g')

plt.legend()

fig.savefig('strategy_1_signals.png')

print(signals)
print(signals.tail())
```


