# AI Persona ChatBot - Client

## Environment Variables Setup

This project uses environment variables for configuration. Create a `.env` file in the client directory with the following variables:

### Required Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_SACHIN_ENDPOINT=/chat/sachin

# App Configuration
VITE_APP_NAME=AI Persona ChatBot
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
```

### Environment Variable Details

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `VITE_API_BASE_URL` | Base URL for the backend API | `http://localhost:3001` |
| `VITE_SACHIN_ENDPOINT` | Endpoint for Sachin persona chat | `/chat/sachin` |
| `VITE_APP_NAME` | Application name displayed in UI | `AI Persona ChatBot` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics features | `false` |

### Important Notes

1. **VITE_ Prefix**: All environment variables must start with `VITE_` to be accessible in the React application
2. **Single Persona**: Currently configured for Sachin persona only
3. **API URLs**: Update `VITE_API_BASE_URL` when deploying to production
4. **Security**: Never commit `.env` files to version control

### Usage Examples

#### Change API Base URL for Production
```bash
VITE_API_BASE_URL=https://your-api-domain.com
```

#### Customize App Name
```bash
VITE_APP_NAME=My Custom ChatBot
```

### File Structure

```
client/
├── .env                 # Environment variables (not committed)
├── .env.example        # Example environment file (committed)
├── .gitignore          # Git ignore rules
└── src/
    └── App.jsx         # Uses environment variables
```

### Getting Started

1. Copy `.env.example` to `.env`
2. Modify the values as needed
3. Restart your development server
4. The changes will be reflected immediately

### Troubleshooting

- **Environment variables not working?** Make sure they start with `VITE_`
- **Changes not reflected?** Restart your development server
- **Build issues?** Check that all required variables are set
