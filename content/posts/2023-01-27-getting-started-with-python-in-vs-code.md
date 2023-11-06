---
title: Getting Started with Python in VS Code
date: 2023-01-27
tags:
  - python
---

### **Install Visual Studio Code and the Python Extension**


This is a summary from [https://code.visualstudio.com/docs/python/python-tutorial](https://code.visualstudio.com/docs/python/python-tutorial). I added my tips and tweaks too.


You should have VS Code installed already.


Then install the [Python extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python).


For Mac OS, install python using `brew`


```bash
brew install python3
```


Verify the Python installation


```bash
python3 --version
```


If you need to set a specific version of python3 as python, then set it in `~/.zshrc`


```bash
export PATH="$HOMEBREW_PREFIX/opt/python@3.11/libexec/bin:$PATH"
alias python=python3
```


Start VS Code in a project (workspace) folder. I’m following a tutorial about Pandas and sckit-learn, so this is the name of the folder


```bash
code machine-learning-pandas-scikit-learn/
```


Select a Python interpreter


Python is an interpreted language, and in order to run Python code and get Python IntelliSense, you must tell VS Code which interpreter to use.


From within VS Code, select a Python 3 interpreter by opening the **Command Palette** (⇧⌘P), start typing the **Python: Select Interpreter** command to search, then select the command. You can also use the **Select Python Environment** option on the Status Bar if available (it may already show a selected interpreter, too)


### **Install and use packages**


A best practice among Python developers is to avoid installing packages into a global interpreter environment. You instead use a project-specific `virtual environment` that contains a copy of a global interpreter. Once you activate that environment, any packages you then install are isolated from other environments. Such isolation reduces many complications that can arise from conflicting package versions. 


```bash
python3 -m venv .venv
source .venv/bin/activate
```


When you create a new virtual environment, you should be prompted by VS Code to set it as the default for your workspace folder. If selected, the environment will automatically be activated when you open a new terminal.


![virtual-env-dialog.png](https://code.visualstudio.com/assets/docs/python/tutorial/virtual-env-dialog.png)


Then install the packages


```bash
python3 -m pip install numpy pandas matplotlib
```


