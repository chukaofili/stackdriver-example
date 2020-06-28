# Stackdriver Example
This example project uses docker, kubernetes & skaffold for development and deployment.

Stackdriver Examples

- Debugger
- Trace
- Error Reporting

Prerequisites:

- Kubernetes Deployment (You can use GKE)
- Install skaffold
- Install docker

To run this demo:

1. Modify `k8s/backend.ingress.yaml` on line 13 & 22 to use a domain you've preconfigured to point to your kubernetes cluster
2. Modify `k8s/frontend.ingress.yaml` on line 13 & 22 to use a domain you've preconfigured to point to your kubernetes cluster
3. skaffold run --default-repo [Your Container Registry Path]