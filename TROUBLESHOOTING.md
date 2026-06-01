# Troubleshooting Guide

## 🔴 Contact Endpoint 500 Error

If you're seeing a 500 Internal Server Error when calling the contact endpoint, here are the steps to diagnose and fix:

### 1. Check Backend Server Logs
```bash
cd server
npm run dev
```

Look for error messages in the console output.

### 2. Verify MongoDB Connection

**Common Issues:**
- `MONGODB_URL` environment variable not set
- MongoDB server not running
- Incorrect connection string

**Solution:**
```bash
# Set the environment variable
export MONGODB_URL="mongodb://localhost:27017/SaasyHive"

# Or create a .env file in server directory:
echo "MONGODB_URL=mongodb://localhost:27017/SaasyHive" > .env
```

### 3. Check Email Configuration

**Common Issues:**
- `EMAIL_USER` or `EMAIL_PASS` not set
- Incorrect email credentials
- Gmail security blocking app access

**Solution:**
```bash
# Set email environment variables
export EMAIL_USER="your-email@gmail.com"
export EMAIL_PASS="your-app-password"
```

**For Gmail:** You may need to create an [App Password](https://myaccount.google.com/apppasswords)

### 4. Test the Endpoint Manually

```bash
# Using curl
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","namee":"Test User","text":"Test message"}'

# Using the test script
node test_contact_endpoint.js
```

### 5. Common Error Scenarios

#### Syntax Error (Fixed)
**Error**: `Unexpected token` or similar
**Cause**: Extra space in object property (` At: new Date()`)
**Fix**: Changed to `at: new Date()` in `server/controllers/controller.js`

#### MongoDB Connection Error
**Error**: `MONGODB_URL is missing` or connection timeout
**Fix**: Set proper MongoDB URL and ensure MongoDB is running

#### Email Authentication Error
**Error**: `Invalid login: 535-5.7.8`
**Fix**: Use Gmail App Password or correct email credentials

### 6. Verify Database Collections

After successful contact submission, check MongoDB:
```bash
# Connect to MongoDB
mongosh

# Switch to SaasyHive database
use SaasyHive

# Check messages collection
db.messages.find().pretty()
```

### 7. Check CORS Headers

If you see CORS errors in the browser console:
```bash
# Verify CORS is properly configured
# In server/server.js, ensure:
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

# Set ALLOWED_ORIGINS for development
export ALLOWED_ORIGINS="http://localhost:5173"
```

## 🟢 Success Indicators

When working correctly, you should see:
1. **Backend console**: `Message sent Successfully!`
2. **Browser**: Alert with "Message Sent!"
3. **MongoDB**: New document in `messages` collection
4. **Email**: Received at `saasyhive@gmail.com`

## 🔧 Additional Checks

1. **Verify all environment variables**:
   ```bash
   # In server directory
   echo "MONGODB_URL: $MONGODB_URL"
   echo "EMAIL_USER: $EMAIL_USER"
   echo "ALLOWED_ORIGINS: $ALLOWED_ORIGINS"
   ```

2. **Check port conflicts**:
   ```bash
   # Make sure port 5000 is available
   lsof -i :5000
   kill -9 <PID>  # if needed
   ```

3. **Test with Postman/Insomnia**:
   - Send POST request to `http://localhost:5000/api/contact`
   - Include JSON body with `email`, `namee`, `text`

## 📋 Fixed Issues

### Contact Controller Syntax Error
**File**: `server/controllers/controller.js`
**Issue**: Extra space before `At` in object property
**Before**: `{ namee, email, text,  At: new Date() }`
**After**: `{ namee, email, text, at: new Date() }`

### Error Message Consistency
**File**: `server/controllers/controller.js`
**Issue**: Generic "Notify error" for contact endpoint
**After**: Specific "Contact error" for better debugging

### Environment Variable Consistency
**Files**: Updated documentation to use correct variable names:
- `EMAIL_PASS` instead of `EMAIL_PASSWORD`
- `MONGODB_URL` instead of `MONGODB_URI`

## 🚀 Next Steps

1. Start MongoDB service
2. Set all required environment variables
3. Start backend server (`npm run dev`)
4. Test contact endpoint manually
5. Verify frontend can communicate with backend