---
title: Tips on Terraform
date: 2022-08-27
tags:
  - terraform
  - tips
---

### TF_VAR_

Environment variables can be used to set terraform variables. The environment variable must be in the format of `TF_VAR_name`

```bash
export TF_VAR_region=eu-west-1
export TF_VAR_ami=ami-049d8641
export TF_VAR_list='[1,2,3]'
export TF_VAR_map='{ foo = "bar", baz = "qux" }'
```

