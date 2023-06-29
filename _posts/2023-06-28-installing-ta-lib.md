---
title: Installing TA-lib
date: 2023-06-28
tags:
  - python
---

The **`pandas-ta`** Python package extends **`Pandas`** to provide easy support for technical analysis indicators. However, during my initial attempt to install the package, I encountered an issue with installing the required **`TA-lib`**.

Here is the error message I received:

```bash
python3 -m pip install TA-lib
Collecting TA-lib
  Using cached TA-Lib-0.4.26.tar.gz (272 kB)
  Installing build dependencies ... done
  Getting requirements to build wheel ... done
  Installing backend dependencies ... done
  Preparing metadata (pyproject.toml) ... done
Requirement already satisfied: numpy in /opt/homebrew/lib/python3.11/site-packages (from TA-lib) (1.24.3)
Building wheels for collected packages: TA-lib
  Building wheel for TA-lib (pyproject.toml) ... error
  error: subprocess-exited-with-error
  
  × Building wheel for TA-lib (pyproject.toml) did not run successfully.
  │ exit code: 1
  ╰─> [27 lines of output]
      <string>:77: UserWarning: Cannot find ta-lib library, installation may fail.
      running bdist_wheel
      running build
      running build_py
      creating build
      creating build/lib.macosx-13-arm64-cpython-311
      creating build/lib.macosx-13-arm64-cpython-311/talib
      copying talib/abstract.py -> build/lib.macosx-13-arm64-cpython-311/talib
      copying talib/test_polars.py -> build/lib.macosx-13-arm64-cpython-311/talib
      copying talib/test_abstract.py -> build/lib.macosx-13-arm64-cpython-311/talib
      copying talib/deprecated.py -> build/lib.macosx-13-arm64-cpython-311/talib
      copying talib/__init__.py -> build/lib.macosx-13-arm64-cpython-311/talib
      copying talib/stream.py -> build/lib.macosx-13-arm64-cpython-311/talib
      copying talib/test_pandas.py -> build/lib.macosx-13-arm64-cpython-311/talib
      copying talib/test_data.py -> build/lib.macosx-13-arm64-cpython-311/talib
      copying talib/test_func.py -> build/lib.macosx-13-arm64-cpython-311/talib
      copying talib/test_stream.py -> build/lib.macosx-13-arm64-cpython-311/talib
      running build_ext
      building 'talib._ta_lib' extension
      creating build/temp.macosx-13-arm64-cpython-311
      creating build/temp.macosx-13-arm64-cpython-311/talib
      clang -Wsign-compare -Wunreachable-code -fno-common -dynamic -DNDEBUG -g -fwrapv -O3 -Wall -isysroot /Library/Developer/CommandLineTools/SDKs/MacOSX13.sdk -I/usr/include -I/usr/local/include -I/opt/include -I/opt/local/include -I/opt/homebrew/include -I/opt/homebrew/opt/ta-lib/include -I/opt/homebrew/Cellar/python@3.11/3.11.1/Frameworks/Python.framework/Versions/3.11/lib/python3.11/site-packages/numpy/core/include -I/opt/homebrew/opt/python@3.11/Frameworks/Python.framework/Versions/3.11/include/python3.11 -c talib/_ta_lib.c -o build/temp.macosx-13-arm64-cpython-311/talib/_ta_lib.o
      talib/_ta_lib.c:747:10: fatal error: 'ta-lib/ta_defs.h' file not found
      #include "ta-lib/ta_defs.h"
               ^~~~~~~~~~~~~~~~~~
      1 error generated.
      error: command '/usr/bin/clang' failed with exit code 1
      [end of output]
  
  note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for TA-lib
Failed to build TA-lib
ERROR: Could not build wheels for TA-lib, which is required to install pyproject.toml-based p
```

Upon investigation, I discovered that the **`TA-lib`** Python package is actually a wrapper around a C library. Therefore, it was necessary to install the C library separately. I resolved this by executing the following command: 

```bash
brew install ta-lib
```

After installing the C library, I attempted to install the Python package again, and this time it was successful: 

```bash
python3 -m pip install TA-Lib
```

I hope this information helps you with your installation process.

Please let me know if you have any further questions or concerns.

