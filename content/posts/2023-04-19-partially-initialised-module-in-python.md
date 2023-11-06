---
title: Partially initialised module in Python
date: 2023-04-19
tags:
  - python
---

I was trying to run my python script has had been running well but kept getting an error after I renamed a file to `signal`


```bash
File "/Users/andrew/github/buy-sell-signals/src/decide-buysell/signal.py", line 16, in <module>
    yfTicker = yf.Ticker(ticker)
               ^^^^^^^^^
AttributeError: partially initialized module 'yfinance' has no attribute 'Ticker' (most likely due to a circular import)
```


It turned out that it was because [the file name collided with a name of an imported module](https://stackoverflow.com/questions/59762996/how-to-fix-attributeerror-partially-initialized-module). Python saw the local file and thought it was the module. So be careful not to name your file too generic!


