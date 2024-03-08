---
title: "Fixing Google Cloud CLI Error: \"ModuleNotFoundError: No module named 'imp'\""
date: 2024-03-07
tags:
  - tools
  - python
  - gcloud
---
I updated the python version recently and it broke Google Cloud CLI (gcloud) on my machine

Upon attempting to use `gcloud auth login`, you encounter an error:
```shell
gcloud components update
Traceback (most recent call last):
  File "/opt/homebrew/Caskroom/google-cloud-sdk/444.0.0/google-cloud-sdk/lib/gcloud.py", line 132, in <module>
    main()
  File "/opt/homebrew/Caskroom/google-cloud-sdk/444.0.0/google-cloud-sdk/lib/gcloud.py", line 90, in main
    from googlecloudsdk.core.util import encoding
  File "/opt/homebrew/share/google-cloud-sdk/lib/googlecloudsdk/__init__.py", line 23, in <module>
    from googlecloudsdk.core.util import importing
  File "/opt/homebrew/share/google-cloud-sdk/lib/googlecloudsdk/core/util/importing.py", line 23, in <module>
    import imp
ModuleNotFoundError: No module named 'imp'
```

Upon investigation, it turned out

- Checking the Python version reveals it's `3.12.2`.
- The `imp` module was removed in Python 3.12, causing the error for `gcloud`.

```shell
python3
Python 3.12.2 (main, Feb  6 2024, 20:19:44) [Clang 15.0.0 (clang-1500.1.0.2.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information
```

But I was in a Catch-22 Situation. While the latest gcloud now supports Python 3.12, updating it requires the `gcloud components update` command, which is unavailable because `gcloud` is currently broken. 

The solution was manually point to Python to version 3.11 and update `gcloud` components. 

Open your `.zshrc` file (or the appropriate shell configuration file).
Add the following line:
```shell
export CLOUDSDK_PYTHON="/opt/homebrew/bin/python3.11"
```

This line sets the environment variable `CLOUDSDK_PYTHON` to point to your desired Python 3.11 location (replace the path if necessary).

Run `source ~/.zshrc` (or the appropriate command to source your configuration file).
Now, you can execute `gcloud components update` to update the gcloud CLI to a version compatible with Python 3.12.

By manually setting the `CLOUDSDK_PYTHON` environment variable to an older, compatible Python version, you can bypass the initial error and successfully update the Google Cloud CLI to a version working with Python 3.12. Remember to adjust the paths based on your specific installation locations.