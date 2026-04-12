# Rural Connect Frontend

React + Vite + Tailwind frontend for Rural Connect.

## Features

- Premium responsive UI
- Role-based dashboards (Citizen, Pradhan, District)
- OTP registration/login flow integration
- Complaint raise/list/detail timeline
- Community join + chat
- Notification list + mark read
- Floating chatbot assistant
- Lazy loaded routes + skeleton loading + error boundary

## Environment

Use the following files:

- `.env.development`
- `.env.production`
- `.env.example`

Important variables:

- `VITE_API_BASE_URL`
- `VITE_PROXY_TARGET`
- `VITE_PROXY_FALLBACK_TARGET`

## Scripts

- `npm run dev` - local dev server
- `npm run dev:host` - dev server on all interfaces
- `npm run lint` - eslint checks
- `npm run build` - standard build
- `npm run build:prod` - production mode build
- `npm run preview` - preview built app
- `npm run preview:host` - preview with host/port
- `npm run check` - lint + build
- `npm run deploy:static` - build and preview production artifact

## Local Run

1. `npm install`
2. `npm run dev:host`
3. Open `http://localhost:5173`

## Production Notes

- Build output is generated at `dist/`
- Configure `VITE_API_BASE_URL` to deployed backend base URL
- Serve `dist` using Nginx/Apache/CDN static hosting
