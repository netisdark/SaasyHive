# Backend Environment Setup for Azure

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
# Server Configuration
PORT=5000

# MongoDB Connection
MONGODB_URL=mongodb://localhost:27017/saasyhive

# CORS Configuration (comma-separated list of allowed origins)
ALLOWED_ORIGINS=https://your-render-frontend-url.com,http://localhost:5173

# Email Configuration (if using email services)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

## Azure App Service Configuration

1. **Deployment**: Deploy the server directory as a Node.js application
2. **Startup Command**: `node server.js`
3. **Environment Variables**: Configure in Azure App Service Configuration section
4. **Port**: Azure automatically sets PORT environment variable to 8080

## CORS Configuration

The backend is configured to accept CORS requests from:
- Your Render frontend URL
- Local development (http://localhost:5173)

## Health Check

Azure can use the `/health` endpoint for health monitoring:
```
GET /health
```

## Important Notes

1. Never commit `.env` files to version control
2. Add `.env` to your `.gitignore`
3. Configure all sensitive information in Azure App Service Configuration