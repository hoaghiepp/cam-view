// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://nabang1010.ddns.net:10122/api/v1',
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  ENDPOINTS: {
    LOGIN: process.env.NEXT_PUBLIC_AUTH_LOGIN_ENDPOINT || '/auth/login',
    LOGOUT: process.env.NEXT_PUBLIC_AUTH_LOGOUT_ENDPOINT || '/auth/logout',
  }
};

// App Configuration
export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || 'AI System',
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
};

// API Headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
