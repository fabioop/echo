# Echo news app

Your voice, amplified.

- [Live demo](https://echo-news-app.vercel.app)

## Notes

- There is a delay in the response of the API to simulate a real-time scenario. You can change the delay in the `src/utils/requests.ts` file on `API_SIMULATION_DELAY`.

## Accounts

- Admin: Create an account and request the admin role by sending an email to `hello@fabiopereira.world`
- Regular user: You can create your own account

## Environment variables

- Check the `.env.example` file for the environment variables.

## Tech stack

- Auth0: Authentication
- Biome: Linting and formatting
- CSS Modules: Styling
- Husky: Pre-commit hooks
- Lint Staged: Pre-commit hooks
- Local storage: Data storage
- Next SEO: SEO optimization
- Next.js: React framework
- React Hook Form: Form handling
- React Toastify: Notifications
- TypeScript: Static typing

## Features

- Users can create an account and login (via Auth0)
- Admin users can create, edit and delete articles
- Admin users can view all articles (including drafts)
- Regular users can view articles from other users
- Each user has a profile page (with its own articles)
- Users can filter articles by categories
- Users can load more articles (pagination, that updates based on the selected categories)
- Pagination items can be changed in the `src/hooks/use-articles.ts` file on `ARTICLES_PER_PAGE`

## Setup

### Requirments

- Node.js >= 20
- Yarn >= 1.22.19

### Install dependencies

```bash
yarn
```

### Running the app

```bash
yarn dev
```

### Run linters

```bash
yarn lint
```

### Run linters and fix errors

```bash
yarn lint:fix
```
