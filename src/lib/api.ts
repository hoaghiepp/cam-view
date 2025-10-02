import { API_CONFIG, DEFAULT_HEADERS } from './config';

// Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    user: {
      id: number;
      user_id: string;
      username: string;
      fullname: string;
      email: string;
      phone_number: string;
      is_active: boolean;
      role_name: string;
      created_at: string;
    };
  };
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// API Client Class
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
    };

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || `HTTP Error: ${response.status}`,
          status: response.status,
          code: errorData.code,
        } as ApiError;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw {
            message: 'Request timeout',
            status: 408,
            code: 'TIMEOUT',
          } as ApiError;
        }
        
        throw {
          message: error.message || 'Network error',
          status: 0,
          code: 'NETWORK_ERROR',
        } as ApiError;
      }
      
      throw error;
    }
  }

  // Auth Methods
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<{ success: boolean; message: string }> {
    return this.request(API_CONFIG.ENDPOINTS.LOGOUT, {
      method: 'POST',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Convenience functions
export const authApi = {
  login: (credentials: LoginRequest) => apiClient.login(credentials),
  logout: () => apiClient.logout(),
};
