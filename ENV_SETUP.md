# Hướng dẫn cấu hình biến môi trường

## 1. Tạo file .env.local

Tạo file `.env.local` trong thư mục root của dự án với nội dung sau:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://nabang1010.ddns.net:10122/api/v1
NEXT_PUBLIC_API_TIMEOUT=10000

# Auth Configuration
NEXT_PUBLIC_AUTH_LOGIN_ENDPOINT=/auth/login
NEXT_PUBLIC_AUTH_LOGOUT_ENDPOINT=/auth/logout

# App Configuration
NEXT_PUBLIC_APP_NAME=AI System
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 2. Cấu hình linh hoạt

### Thay đổi API URL:
```bash
# Development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1

# Staging
NEXT_PUBLIC_API_BASE_URL=https://staging-api.example.com/api/v1

# Production
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api/v1
```

### Thay đổi timeout:
```bash
# Timeout 5 giây
NEXT_PUBLIC_API_TIMEOUT=5000

# Timeout 30 giây
NEXT_PUBLIC_API_TIMEOUT=30000
```

### Thay đổi endpoints:
```bash
# Custom login endpoint
NEXT_PUBLIC_AUTH_LOGIN_ENDPOINT=/custom/login

# Custom logout endpoint
NEXT_PUBLIC_AUTH_LOGOUT_ENDPOINT=/custom/logout
```

## 3. Các file môi trường khác

### .env.development (cho development)
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_API_TIMEOUT=30000
```

### .env.production (cho production)
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.production.com/api/v1
NEXT_PUBLIC_API_TIMEOUT=10000
```

## 4. Lưu ý quan trọng

1. **NEXT_PUBLIC_** prefix: Cần thiết để biến có thể truy cập từ client-side
2. **Không commit .env.local**: Thêm vào .gitignore
3. **Restart server**: Sau khi thay đổi biến môi trường, cần restart Next.js server
4. **Fallback values**: Các giá trị mặc định đã được cấu hình trong `src/lib/config.ts`

## 5. Kiểm tra cấu hình

Mở browser console và chạy:
```javascript
console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
```

Hoặc kiểm tra trong component:
```typescript
import { API_CONFIG } from '@/lib/config';
console.log('API Base URL:', API_CONFIG.BASE_URL);
```
