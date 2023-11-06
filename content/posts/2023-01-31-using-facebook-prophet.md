---
title: Using Facebook Prophet
date: 2023-01-31
tags:
  - python
  - prophet
---

[Prophet](https://facebook.github.io/prophet/) is an open source time series forecasting library developed by Facebook's Core Data Science team. It provides a simple and efficient way to make predictions for various forecasting problems, including forecasting trends and seasonal patterns in time series data. It uses a Bayesian method based on a decomposable time series model, and is designed to be used in business and finance applications, among others.


### Resources

- [https://www.geeksforgeeks.org/share-price-forecasting-using-facebook-prophet/](https://www.geeksforgeeks.org/share-price-forecasting-using-facebook-prophet/)

### Installation


Set a virtual environment and then install `prophet`


```bash
python3 -m venv .venv
source .venv/bin/activate
```


```bash
python3 -m pip install prophet
python3 -m pip install matplotlib numpy pandas plotly scikit-learn
```


### Using `prophet` to forecast share prices


First, install all the usual packages


```bash
python3 -m pip install numpy pandas matplotlib
```


As of this writing, `prophet` has [a dependencies issue on M1, M2 Mac](https://github.com/facebook/prophet/issues/2250). [The currently working combination](https://gist.github.com/thewisenerd/52f937d01b06287ccf21a05a118e74ad) is the below


```bash
brew install python@3.11
python3.11 -m pip install cmdstanpy
python3.11 -m pip install prophet # this should work ? if it dont, good luck lmao
# RuntimeError: Error during optimization! Command '/opt/homebrew/lib/python3.11/site-packages/prophet/stan_model/prophet_model.bin
# dyld[71677]: Library not loaded: '@rpath/libtbb.dylib'
install_name_tool -add_rpath .venv/lib/python3.11/site-packages/prophet/stan_model/cmdstan-2.26.1/stan/lib/stan_math/lib/tbb .venv/lib/python3.11/site-packages/prophet/stan_model/prophet_model.bin

```


