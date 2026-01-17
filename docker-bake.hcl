variable "REGISTRY" {
  default = "{{DOCKER_REGISTRY}}"
}

variable "TAG" {
  default = "latest"
}

variable "GIT_COMMIT_SHA" {
  default = "unknown"
}

group "default" {
  targets = ["app"]
}

target "docker-metadata-action" {}

target "app" {
  inherits = ["docker-metadata-action"]
  context = "."
  dockerfile = "Dockerfile"
  platforms = [
    "linux/amd64",
    "linux/arm64"
  ]
  tags = [
    "${REGISTRY}/{{APP_NAME}}:${TAG}",
    "${REGISTRY}/{{APP_NAME}}:latest"
  ]
  args = {
    GIT_COMMIT_SHA = "${GIT_COMMIT_SHA}"
  }
  cache-from = ["type=registry,ref=${REGISTRY}/{{APP_NAME}}:buildcache"]
  cache-to = ["type=registry,ref=${REGISTRY}/{{APP_NAME}}:buildcache,mode=max"]
}

target "app-local" {
  inherits = ["app"]
  platforms = []
  output = ["type=docker"]
}

target "devcontainer" {
  context = ".devcontainer"
  dockerfile = "Dockerfile"
  platforms = [
    "linux/amd64",
    "linux/arm64"
  ]
  tags = [
    "${REGISTRY}/devcontainer:latest"
  ]
  output = ["type=docker"]
}