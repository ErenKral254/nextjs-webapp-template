# Next.js Web Application Template

A production-ready Next.js 15 template with Chakra UI, Prisma, Kubernetes deployment with Helm charts, Google Secret Manager integration, cert-manager, and Flux GitOps support.

## Features

### Core Application Stack
- **Next.js 15** with App Router
- **Chakra UI v3** for component library
- **TypeScript** with strict mode
- **React 19** with latest features
- **Zod** for validation

### Database Layer
- **Prisma ORM** with PostgreSQL
- **Field-level encryption** support
- **Migration system** with version control
- **Seed scripts** for initial data

### Kubernetes Infrastructure
- **Helm chart** with environment-specific values (dev/staging/prod)
- **Gateway API** for ingress (modern alternative to legacy Ingress)
- **cert-manager** integration for automated TLS
- **HPA** (Horizontal Pod Autoscaler)
- **PodDisruptionBudget** for availability
- **ServiceAccount** with Workload Identity

### Secret Management
- **Google Secret Manager** integration via CSI driver
- **SecretProviderClass** for mounting secrets
- **Workload Identity** for secure GCP access
- Environment-specific secret configurations

### CI/CD & GitOps
- **Semantic Release** for versioning
- **GitHub Actions** for CI/CD
- **Flux** Kustomization and HelmRelease support
- **Docker multi-stage builds** with multi-arch support

### Developer Experience
- **Devcontainer** configuration
- **Taskfile.yml** with comprehensive tasks
- **ESLint + Prettier** configuration
- **Husky + commitlint** for commit standards
- **Vitest** for testing

## Quick Start

### 1. Use This Template

Click "Use this template" on GitHub or clone and rename:

```bash
git clone https://github.com/r2DoesInc/nextjs-webapp-template.git my-app
cd my-app
```

### 2. Replace Placeholders

Replace these placeholders throughout the codebase:

| Placeholder | Description | Example |
|-------------|-------------|----------|
| `{{APP_NAME}}` | Application name (kebab-case) | `my-web-app` |
| `{{APP_TITLE}}` | Display title | `My Web App` |
| `{{GITHUB_ORG}}` | GitHub org/username | `FutureHax` |
| `{{GCP_PROJECT}}` | GCP project ID | `my-project-123` |
| `{{GCP_REGION}}` | GCP region | `us-central1` |
| `{{DOCKER_REGISTRY}}` | Artifact Registry URL | `us-central1-docker.pkg.dev/proj/repo` |
| `{{K8S_NAMESPACE}}` | Kubernetes namespace | `my-app-prod` |
| `{{DOMAIN}}` | Primary domain | `app.example.com` |

You can use find-and-replace or run:

```bash
# macOS/Linux
find . -type f \( -name "*.json" -o -name "*.yaml" -o -name "*.yml" -o -name "*.ts" -o -name "*.tsx" -o -name "*.md" -o -name "*.hcl" -o -name "Dockerfile" -o -name "Taskfile.yml" \) -exec sed -i '' 's/{{APP_NAME}}/my-app/g' {} +
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Run migrations (development)
npm run db:migrate

# Seed initial data
npm run db:seed
```

### 5. Start Development

```bash
npm run dev
```

## Project Structure

```
├── .devcontainer/           # Dev container configuration
├── .github/
│   └── workflows/
│       └── ci.yml           # CI/CD pipeline
├── chart/
│   └── {{APP_NAME}}/
│       ├── Chart.yaml
│       ├── base/values.yaml
│       ├── dev/values.yaml
│       ├── staging/values.yaml
│       ├── prod/values.yaml
│       └── templates/       # K8s manifests
├── flux/
│   ├── dev/
│   ├── staging/
│   └── prod/                # Flux HelmReleases
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/
│   ├── lib/
│   ├── providers/
│   └── styles/
├── Dockerfile
├── docker-bake.hcl
├── Taskfile.yml
└── package.json
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter
npm run type-check       # TypeScript checking

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Testing
npm run test             # Run tests (watch)
npm run test:run         # Run tests once
```

## Deployment

### Using Taskfile

```bash
# Build and deploy to development
task deploy:dev

# Build and deploy to staging
task deploy:staging

# Build and deploy to production
task deploy:prod
```

### Using Flux

Flux automatically syncs changes from the repository. Push changes to trigger deployment:

```bash
# Force reconciliation
task flux:reconcile:prod

# Check status
task flux:status
```

## Documentation

See the `docs/` folder for detailed guides:

- [GCP Setup](docs/GCP_SETUP.md) - Google Cloud Platform configuration
- [Kubernetes Setup](docs/KUBERNETES_SETUP.md) - Cluster and Helm setup
- [Secret Management](docs/SECRET_MANAGEMENT.md) - GSM and Workload Identity
- [Database Setup](docs/DATABASE_SETUP.md) - PostgreSQL and Prisma
- [Deployment](docs/DEPLOYMENT.md) - CI/CD and GitOps workflow

## License

MIT
