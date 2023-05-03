---
title: Deleting Unused Kubernetes Resources
date: 2023-05-02
tags:
  - kubernetes
  - google cloud
---

Kubernetes is a powerful tool for managing containerised applications. However, it can be easy to create unused Kubernetes resources, especially if you are not familiar with the platform.

This is how to find and delete unused Kubernetes resources.

### **Connect to the Kubernetes Cluster**

The first step is to connect to the Kubernetes cluster. You can do this using the following command:

```bash
kubectl get nodes
```

This command will list all of the nodes in the cluster. Once you have found the node that you want to connect to, you can use the following command to connect to it:

```bash
kubectl --kubeconfig=/path/to/kubeconfig connect <node-name>
```

### **List All Resources**

The next step is to list all of the resources in the cluster. You can do this using the following command:

```bash
kubectl api-resources --verbs=list --no-headers=true --output=name
```

This command will list all of the resources in the cluster, along with their verbs and names.

The command `kubectl api-resources --verbs=list --no-headers=true --output=name` lists all of the resources in the cluster, along with their verbs and names. The command `xargs -n1` takes the output of the previous command and uses it as the arguments for the next command. In this case, the next command is `kubectl get --ignore-not-found -l app.kubernetes.io/name=app-to-delete -A`. This command gets all of the resources in the cluster that match the label `app.kubernetes.io/name=app-to-delete`. The `-A` flag tells kubectl to get all resources in the cluster, including those in subnamespaces. The `-l` flag tells kubectl to filter the results by label. In this case, the label is `app.kubernetes.io/name=app-to-delete`.

### **Find Unused Resources**

Now that you have a list of all of the resources in the cluster, you can start to find the unused resources. You can do this by using the following command:

```bash
kubectl api-resources --verbs=list --no-headers=true --output=name | xargs -n1 kubectl get --ignore-not-found -l app.kubernetes.io/name=app-to-delete -A
```

This command will list all of the resources in the cluster that match the label `app.kubernetes.io/name=app-to-delete`.

### **Delete Unused Resources**

Once you have found the unused resources, you can delete them using the following command:

```bash
kubectl api-resources --verbs=list --no-headers=true --output=name | xargs -n1 kubectl delete --ignore-not-found -l app.kubernetes.io/name=app-to-delete -A
```

This command will delete all of the resources in the cluster that match the label `app.kubernetes.io/name=app-to-delete`.

