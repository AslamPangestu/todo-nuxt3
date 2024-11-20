# Nuxt + Pinia

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

## Production

Build the application for production:

```bash
docker build -t <image-name> .
docker run -d --name <container-name> -p 127.0.0.1:3000:3000 <image-name>
```
