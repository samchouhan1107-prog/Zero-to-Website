# Deployment and Operations

## Hosting configuration

The checked-in deployment descriptor is [`render.yaml`](render.yaml). The service builds with `npm run build` and starts with `node dist/server.js`. The Node.js version is configured in `.node-version` and constrained by `package.json`.

The GitHub Actions workflow runs type checking and a production build. It does not publish a site. Production deployment remains controlled by the connected hosting service and its dashboard settings.

## Validate a local build

Run these commands from the repository root:

```sh
npm ci
npm run lint
npm run build
```

To run the built Express server locally, set any needed environment variables and run:

```sh
npm start
```

The server uses the hosting-provided `PORT`, or port 3000 when it is not set.

## Environment variables

See `.env.example` for the names read by the current source. Values that contain credentials must be configured as secrets in the hosting provider, not committed to the repository.

| Variable | Purpose |
| --- | --- |
| `NODE_ENV` | Selects development or production server behavior. |
| `PORT` | HTTP port supplied by the host; defaults to 3000. |
| `CORS_ORIGIN` | Optional allowed frontend origin. |
| `GEMINI_API_KEY` | Optional server-side Gemini access for AI features. |
| `APP_ORIGIN` | Public origin used to form payment return URLs. |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Optional Stripe server credentials. |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Optional Razorpay server credentials. |
| `MERCHANT_WEBHOOK_SECRET` | Optional merchant webhook verification secret. |
| `VITE_API_URL` | Optional frontend API origin; leave blank for same-origin requests. |

Only configure payment credentials when the matching merchant integration is intentionally enabled. Never enter real credentials in `.env.example`.

## Persistent data warning

Authentication, sessions, Storehouse, payments, subscriptions, publishing drafts, rights, and access grants use JSON files under `server/`. The checked-in `render.yaml` does **not** declare a persistent disk or external database. Confirm the host's storage behavior and configure durable storage and backups before treating those records as durable production data. Do not delete or overwrite the JSON files as part of a build or cleanup.

## Production verification

After a hosting deployment, verify the public site, `/api/health`, authentication, Storehouse, student progress, publishing, and payment behavior in the deployed environment. A successful local build does not prove production data persistence or live merchant configuration.
