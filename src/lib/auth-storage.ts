// Auth Storage Utilities
export interface StoredUserInfo {
  id: number;
  user_id: string;
  username: string;
  fullname: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  role_name: string;
  created_at: string;
}

export interface StoredAuthData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: StoredUserInfo;
}

// Storage keys
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  TOKEN_TYPE: 'token_type',
  EXPIRES_IN: 'expires_in',
  USER_INFO: 'user_info',
} as const;

// Auth Storage Class
export class AuthStorage {
  // Store auth data
  static storeAuthData(authData: StoredAuthData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authData.access_token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authData.refresh_token);
      localStorage.setItem(STORAGE_KEYS.TOKEN_TYPE, authData.token_type);
      localStorage.setItem(STORAGE_KEYS.EXPIRES_IN, authData.expires_in.toString());
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(authData.user));
    } catch (error) {
      console.error('Error storing auth data:', error);
    }
  }

  // Get access token
  static getAccessToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  // Get refresh token
  static getRefreshToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  // Get token type
  static getTokenType(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.TOKEN_TYPE);
    } catch (error) {
      console.error('Error getting token type:', error);
      return null;
    }
  }

  // Get user info
  static getUserInfo(): StoredUserInfo | null {
    try {
      const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO);
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error('Error getting user info:', error);
      return null;
    }
  }

  // Get full auth header
  static getAuthHeader(): string | null {
    const token = this.getAccessToken();
    const tokenType = this.getTokenType();
    
    if (token && tokenType) {
      return `${tokenType} ${token}`;
    }
    
    return null;
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const expiresIn = localStorage.getItem(STORAGE_KEYS.EXPIRES_IN);
    
    if (!token || !expiresIn) {
      return false;
    }

    // You might want to add expiration check here
    // const expirationTime = parseInt(expiresIn);
    // const currentTime = Date.now() / 1000;
    // return currentTime < expirationTime;
    
    return true;
  }

  // Clear all auth data
  static clearAuthData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.TOKEN_TYPE);
      localStorage.removeItem(STORAGE_KEYS.EXPIRES_IN);
      localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  // Get all auth data
  static getAllAuthData(): Partial<StoredAuthData> | null {
    try {
      const accessToken = this.getAccessToken();
      const refreshToken = this.getRefreshToken();
      const tokenType = this.getTokenType();
      const expiresIn = localStorage.getItem(STORAGE_KEYS.EXPIRES_IN);
      const user = this.getUserInfo();

      if (!accessToken) {
        return null;
      }

      return {
        access_token: accessToken,
        refresh_token: refreshToken || '',
        token_type: tokenType || 'bearer',
        expires_in: expiresIn ? parseInt(expiresIn) : 0,
        user: user || undefined,
      };
    } catch (error) {
      console.error('Error getting all auth data:', error);
      return null;
    }
  }
}
