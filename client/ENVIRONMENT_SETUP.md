# Frontend Environment Setup

## Environment Variables

Create a `.env.development` file in the client directory with the following content:

```
VITE_API_URL=http://localhost:5000/api
```

For production deployment on Render, create a `.env.production` file:

```
VITE_API_URL=https://your-azure-backend-url/api
```

## Available Variables

- `VITE_API_URL`: Base URL for backend API calls

## Usage

The frontend uses Vite's environment variables with `VITE_` prefix. These are automatically available in your code as `import.meta.env.VITE_API_URL`.

## Important Notes

1. Never commit `.env.development` or `.env.production` files to version control
2. Add these files to your `.gitignore`
3. Configure environment variables in your Render dashboard for production