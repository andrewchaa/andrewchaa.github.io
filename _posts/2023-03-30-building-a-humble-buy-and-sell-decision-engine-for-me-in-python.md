---
title: Building a humble buy and sell decision engine for me in Python
date: 2023-03-30
tags:
  - python
---

My Python skill is pretty shallow. I hope this mini project can help me deepen my understanding.

### Set up a new project

Create a new project directory and activate venv to install packages locally

```bash
mkdir buy-sell-signals
cd code buy-sell-signals

python3 -m venv .venv
source .venv/bin/activate
```

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
    nasdaq_data.to_csv("nasdaq.csv")
    return nasdaq_data


df = get_nasdaq_data()
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

signals['ema_signal'] = np.where(signals['ema'] > df['Close'], 1.0, 0.0)
signals['ema_positions'] = signals['ema_signal'].diff()

fig = plt.figure(figsize=(12, 10))
ax1 = fig.add_subplot(111, ylabel='Price in $')
# signals2 = signals.loc['2018-01-01':, :]

df.loc['2018-01-01':, 'Close'].plot(ax=ax1,
                                    color='r', lw=2., label='Close Price')
signals.loc[:, 'ema'].plot(ax=ax1, lw=2.)

# Plot the buy signals
ax1.plot(signals.loc[signals.ema_positions == 1.0].index,
         signals.ema[signals.ema_positions == 1.0],
         'o', markersize=10, color='r')

# Plot the sell signals
ax1.plot(signals.loc[signals.ema_positions == -1.0].index,
         signals.ema[signals.ema_positions == -1.0],
         '^', markersize=10, color='g')

plt.legend()
plt.show()
# fig.savefig(j'strategy_1_signals.png')

print(signals)
print(signals.tail())
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

