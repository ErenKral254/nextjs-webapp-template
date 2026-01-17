#!/bin/bash
set -e

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Error: Version argument required"
  exit 1
fi

echo "Publishing version $VERSION..."

# Build and push Docker image
echo "Building and pushing Docker image..."
export DOCKER_BUILDKIT=1
export BUILDKIT_PROGRESS=plain
export GIT_COMMIT_SHA=$(git rev-parse --short HEAD)

docker buildx build --push --provenance false --platform linux/amd64,linux/arm64 \
  -t {{DOCKER_REGISTRY}}/{{APP_NAME}}:$VERSION \
  -t {{DOCKER_REGISTRY}}/{{APP_NAME}}:latest \
  --build-arg GIT_COMMIT_SHA=$GIT_COMMIT_SHA \
  .

# Package and push Helm chart
echo "Packaging Helm chart..."
helm package ./chart/{{APP_NAME}} --version $VERSION --app-version v$VERSION

echo "Pushing Helm chart to OCI registry..."
helm push {{APP_NAME}}-$VERSION.tgz oci://{{DOCKER_REGISTRY}}

# Cleanup
rm -f {{APP_NAME}}-$VERSION.tgz

echo "Release $VERSION published successfully!"