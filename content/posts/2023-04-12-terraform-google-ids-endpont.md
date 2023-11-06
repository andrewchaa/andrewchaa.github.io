---
title: Terraform - Google - IDS endpont
date: 2023-04-12
tags:
  - terraform
  - google cloud
---

### References

- [https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_ids_endpoint](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_ids_endpoint)
- [https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_packet_mirroring#mirrored_resources](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_packet_mirroring#mirrored_resources)
- [https://registry.terraform.io/providers/hashicorp/google/4.61.0/docs/data-sources/compute_network](https://registry.terraform.io/providers/hashicorp/google/4.61.0/docs/data-sources/compute_network)

Google Cloud Intrusion Detection System (IDS) is a managed security service designed to detect and report potential security threats in real-time. It helps organizations monitor their network traffic for malicious activity, unauthorized access, and policy violations, providing a comprehensive layer of protection for their cloud infrastructure.


Google IDS leverages advanced threat detection techniques, such as signature-based detection, anomaly-based detection, and machine learning algorithms, to identify and alert on potential threats. This enables organizations to respond quickly to security incidents and minimize the risk of data breaches or other cyberattacks.


### Provision IDS endpoint


```bash
resource "google_cloud_ids_endpoint" "ids_endpoint" {
  name     = "${var.region}-ids-endpoint"
  location = "${var.region}-a"
  network  = module.gcp_network.id
  severity = "MEDIUM"
  project  = var.project_id
  depends_on = [
    module.gcp_network,
    module.gcp_network.ip_address,
    module.gcp_network.vpc_connection,
  ]
}
```


### Packet Mirroring


```bash
data "google_compute_network" "ids_network" {
  name    = module.gcp_network.name
  project = var.project_id
}

data "google_compute_subnetwork" "all_subnets" {
  for_each = toset(data.google_compute_network.ids_network.subnetworks_self_links)

  self_link = each.value
  project   = var.project_id
}

resource "google_compute_packet_mirroring" "ids_packet_mirroring" {
  name        = "${var.region}-ids-packet-mirroring"
  description = "Packet Mirroring for IDS"
  project     = var.project_id
  region      = var.region
  network {
    url = module.gcp_network.id
  }
  collector_ilb {
    url = google_cloud_ids_endpoint.ids_endpoint.endpoint_forwarding_rule
  }
  mirrored_resources {
    dynamic "subnetworks" {
      for_each = data.google_compute_subnetwork.all_subnets
      content {
        url = subnetworks.value.id
      }
    }
  }
}
```


