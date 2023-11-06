---
title: Installing ClamAV on a Linux VM
date: 2023-05-22
tags:
  - azure devops
  - terraform
---

### Do I need to install anti-virus software on Linux?


While it's true that Linux distributions are less susceptible to viruses and malware than Windows systems, it's not completely immune. Linux is often safer due to its smaller user base, its open-source nature, and the way privileges work, limiting the ability of malware to cause damage.


In my case, it was more for a compliance reason though. All our VMs on Google cloud should have an Antivirus software installed. 


### What is ClamAV?


ClamAV is a popular open-source antivirus software toolkit that is used to detect various types of malicious software, including viruses, trojans, and malware. It was originally designed especially for scanning emails at mail gateways, but it can be used in a variety of contexts. Yet it has command-line interface, allowing it to be integrated into scripts and automated workflows and with its scanning capabilities, it fits for our purpose. 


### ClamAV components

- `clamd` or `clamav-daemon`: Daemon that loads the virus database definitions into memory
- `clamav-freshclam`: Daemon that periodically checks for virus database definition updates, downloads, and installation
- `clamdscan`: You can scan the filesystem with this utility

### Memory requirement


`clamd` daemon consumes around 1GB of memory regardless of whether it is actively scanning or not. [So the machine needs at least 1.5GB RAM](https://docs.opnsense.org/manual/how-tos/clamav.html).  Our VMs were originally provisioned with 0.6GB memory with t[he machine type of ](https://cloud.google.com/compute/all-pricing)[`f1-micro`](https://cloud.google.com/compute/all-pricing)[ on Google Cloud](https://cloud.google.com/compute/all-pricing). 


Then `clamav-freshclam` failed to start with a message: 


```yaml
freshclam database load killed by signal 9
```


I updated the terraform and re-provisioned the machine with 2GB RAM with the machine type of `e2-small` and it started working. 


```bash
resource "google_compute_instance" "bastion_instance" {
  project = local.service_project_id

  name         = "gke-bastion${var.name_suffix}"
  description  = md5(local.bastion_cloud_init)
  machine_type = "e2-small"
  zone         = local.host_network_zone_a

  ...
```


### Install ClamAV


The existing terraform script already uses [cloud-init](https://cloud-init.io/), so I added my script to the yaml file.


```yaml
runcmd:
  - [apt-get, update]
  - [apt-get, 'install', -y, clamav, clamav-daemon, clamav-freshclam]
  - [systemctl, stop, clamav-freshclam]
  - [freshclam]
  - [systemctl, start, clamav-freshclam]
  - [systemctl, enable, clamav-daemon]
  - [systemctl, start, clamav-daemon]
```


The reason the script stops `clamav-freshclam` deamon and do `freshclam` manually was because `clamav-deamon` often failed to start due to the race condition: `clamav-daemon` starts before `clamav-freshclam` finishes downloading the AV database.


### References

- [Installation & Configuration of ClamAV](https://aaronbrighton.medium.com/installation-configuration-of-clamav-antivirus-on-ubuntu-18-04-a6416bab3b41)

