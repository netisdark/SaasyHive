# SaasyHive Deployment Guide

## 🎯 New Architecture Overview

The monorepo has been split into:

1. **Frontend**: Vite + React (Hosted on Render in dev mode)
2. **Backend**: Express.js API (Hosted on Azure App Service)
3. **Communication**: REST API calls with CORS

## 🚀 Frontend Deployment (Render)

### Configuration

1. **Create a new Web Service on Render**
2. **Connect your repository**
3. **Configuration**:
   - **Name**: saasyhive-frontend
   - **Root Directory**: `/client`
   - **Build Command**: `npm install && npm run dev`
   - **Start Command**: `npm run dev`
   - **Environment Variables**:
     - `VITE_API_URL=https://your-azure-backend.azurewebsites.net/api`

### Important Notes

- Render will run the Vite development server
- Hot reload is supported in development mode
- The frontend connects to your Azure backend via API calls
- No need to build to `dist/` folder for deployment

## ☁️ Backend Deployment (Azure App Service)

### Prerequisites

1. Azure account with App Service
2. MongoDB Atlas account (or local MongoDB)
3. GitHub repository connected to Azure

### Configuration

1. **Create a new App Service**
   - Runtime stack: Node.js 18 LTS
   - Operating System: Linux
   - Region: Choose closest to your users

2. **Deployment Center**:
   - Source: GitHub
   - Repository: Your monorepo
   - Branch: main
   - Root Directory: `/server`

3. **Startup Command**: `npm start`

4. **Environment Variables** (in Configuration section):
   ```
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   ALLOWED_ORIGINS=https://your-render-frontend.onrender.com,http://localhost:5173
   ```

### CORS Configuration

The backend is configured to accept requests from:
- Your Render frontend URL
- Local development URLs

### Health Check

Azure can monitor the `/health` endpoint:
```
GET https://your-azure-backend.azurewebsites.net/health
```

## 🔧 Local Development

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run dev
```

### Both (using root package.json)
```bash
npm install
npm run dev
```

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/notify` | POST | Subscribe email notifications |
| `/api/contact` | POST | Send contact message |
| `/health` | GET | Health check |
| `/` | GET | API information |

## 🔒 Security Considerations

1. **Never commit `.env` files**
2. **Use HTTPS** for all communications
3. **Configure CORS** properly in production
4. **Use Azure Key Vault** for sensitive secrets
5. **Enable authentication** for sensitive endpoints

## 📝 Environment Files

- `client/.env.development` - Local frontend config
- `client/.env.production` - Production frontend config (not committed)
- `server/.env` - Backend config (not committed)

See individual `ENVIRONMENT_SETUP.md` files in each directory for details.