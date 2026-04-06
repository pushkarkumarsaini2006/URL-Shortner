# BitLinks URL Shortener

BitLinks is a Next.js 15 URL shortener with MongoDB storage.
Users can create custom short links and open them as dynamic routes that redirect to the original long URL.

## Current Status

- Core flow is working end to end:
  - Create short URL from the UI or API.
  - Store and update mappings in MongoDB.
  - Open short URL and redirect to destination URL.
- Redirect route has been fixed to avoid swallowing Next.js redirect control flow.
- Build scripts are now cross-platform and deployment-friendly:
  - dev: next dev
  - build: next build
  - start: next start
  - lint: next lint

## Tech Stack

- Next.js 15 App Router
- React 18
- MongoDB Node driver
- Tailwind CSS

## Main Features

- Custom short code support.
- Short codes are normalized to lowercase.
- Existing short codes are updated instead of duplicate insert.
- Basic validation:
  - URL and short code required.
  - Short code allowed chars: letters, numbers, underscore, hyphen.
  - Self-referential links to the app domain are blocked.
- Redirect URL normalization:
  - Fixes malformed prefixes like ttp:// and ttps://.
  - Adds https:// when protocol is missing.

## Project Structure

```text
app/
  page.js                 Home page
  shorten/page.js         URL create form
  [shorturl]/page.js      Redirect handler
  api/generate/route.js   Create or update short URL
components/
  Navbar.js
lib/
  mongodb.js              MongoDB connection helper
```

## Environment Variables

Create .env.local in the project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
NEXT_PUBLIC_HOST=https://your-domain.vercel.app
```

Notes:
- MONGODB_URI must be a valid mongodb:// or mongodb+srv:// URI.
- NEXT_PUBLIC_HOST should be the production base URL used for short link generation.

## Local Development

1. Install dependencies.

```bash
npm install
```

2. Start the development server.

```bash
npm run dev
```

3. Open http://localhost:3000

## API

Endpoint: POST /api/generate

Request body:

```json
{
  "url": "https://example.com/long-path",
  "shorturl": "my-link"
}
```

Success response:

```json
{
  "success": true,
  "error": false,
  "message": "URL Generated Successfully",
  "shortUrl": "https://your-domain/my-link"
}
```

When short code already exists, it is updated and response message becomes:

```json
{
  "success": true,
  "error": false,
  "message": "Short URL updated successfully",
  "shortUrl": "https://your-domain/my-link"
}
```

## Deployment

Recommended: Vercel.

Required Vercel environment variables:
- MONGODB_URI
- NEXT_PUBLIC_HOST

Build command:

```bash
npm run build
```

## Troubleshooting

- Build failed with exit 127 on Linux:
  - Ensure scripts in package.json use next dev/build/start/lint (not Windows absolute paths).
- Short URL opens 404 instead of redirect:
  - Ensure app/[shorturl]/page.js does not wrap redirect() inside a catch that converts it to notFound().
- Mongo error about valid URI:
  - Verify MONGODB_URI is set correctly in local env or hosting platform settings.

## License

MIT. See LICENSE.