## ThriftX

ThriftX connects Mumbai's independent thrift stores with shoppers across India — promoting circular fashion and helping small businesses thrive.

### Tech Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4, Radix UI primitives, shadcn-style UI components
- MongoDB + Mongoose
- Cloudinary (media uploads/optimization)
- EmailJS (contact form), Leaflet + OpenStreetMap (store location picker)

## Quick Start

### 1) Clone and install

```bash
git clone <your-repo-url>
cd thriftxassesment
npm install
```

### 2) Configure environment

Create a `.env.local` in `thriftxassesment/` with at least:

```bash
# MongoDB (required)
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
MONGODB_DB=thriftx

# Auth (override default for production)
JWT_SECRET=replace-with-a-strong-secret

# Optional admin convenience (used for admin session cookie on login)
ADMIN_EMAIL=admin@admin.com
ADMIN_PASS=admin

# Cloudinary (required for image uploads via /api/upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# EmailJS (required for contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Optional: Calendly link on contact page
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-handle/meeting
```

Notes:
- `MONGODB_URI` is required; the server process will error if missing.
- `JWT_SECRET` should be set to a strong unique value in production.
- Cloudinary is used by `POST /api/upload` and the editor `ImageUpload` component.
- EmailJS keys are read on the client to send the contact form.

### 3) Run the app

```bash
npm run dev
```

Then open `http://localhost:3000`.

### 4) Production build

```bash
npm run build
npm start
```

Node 18+ is recommended.

## Features

- Blog with admin-protected CRUD
  - `GET /api/posts` list, `GET /api/posts/[id]` detail
  - `POST /api/posts` create, `PUT /api/posts/[id]` update, `DELETE /api/posts/[id]` delete (requires admin cookie)
  - Editor UIs at `blog/new` and `blog/[id]/edit` with tag, category, date, image support
- Authentication
  - Email/password signup and login (`/api/auth/signup`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`)
  - HTTP-only `auth_token` cookie for user session
  - Optional admin session via `admin_token` cookie (set when logging in with `ADMIN_EMAIL`)
- Image uploads & optimization
  - Cloudinary upload endpoint `POST /api/upload` with size/type validation
  - Optimized delivery helpers and responsive transformations
- Newsletter subscription
  - `POST /api/newsletter` with validation, duplicate handling, and reactivation flow
- Contact page with location picker
  - EmailJS-powered form submission
  - Leaflet map via CDN, geocoding/reverse-geocoding using Nominatim
  - Optional Calendly CTA when `NEXT_PUBLIC_CALENDLY_URL` is set
- Modern UI/UX
  - Responsive layout and rich animations (Framer Motion)
  - Component library based on Radix primitives and Tailwind v4
- Hero section tuned for local thrift stores with CTA and imagery [[memory:9534521]]
- Responsive hero video: portrait on phones, landscape on larger screens [[memory:9534517]]

## Project Structure

- `src/app` — routes (App Router), API handlers under `src/app/api/*`
- `src/components` — UI components (Hero, Navigation, Footer, ImageUpload, etc.)
- `src/models` — Mongoose models (`User`, `Post`, `Newsletter`)
- `src/lib` — shared libs (`db`, `cloudinary`, `utils`)
- `src/context` — React providers (e.g., `AuthContext`)

## Admin: Creating and editing posts

1) Ensure you have an admin session cookie:
   - Log in with `ADMIN_EMAIL` from your `.env.local` via the standard login form, or
   - Use the dedicated admin login route if provided in your deployment.
2) Visit `http://localhost:3000/blog/new` to create a post.
3) Edit an existing post at `http://localhost:3000/blog/[id]/edit`.

If you receive 401 Unauthorized, ensure the admin cookie is present and `JWT_SECRET` matches on the server.

## Deployment

- The app is compatible with platforms supporting Next.js 15 (e.g., Vercel).
- Set all environment variables in your hosting provider.
- Ensure your MongoDB, Cloudinary, and EmailJS credentials are configured.

## Troubleshooting

- Missing `MONGODB_URI`: the server will throw on startup — set it in `.env.local`.
- 401 from blog create/update/delete: confirm admin session cookie and `ADMIN_EMAIL` match.
- Image upload errors: verify Cloudinary keys and that files are images under 5MB.
- Contact form errors: confirm EmailJS IDs/keys and that the template expects the submitted fields.
