# Customer Authentication API

This document describes the customer-specific authentication endpoints for the frontend store project.

## Base URL

```
http://localhost:3000/api/customers/auth
```

## Overview

The customer authentication system is built on top of `better-auth` and provides customer-specific functionality including:

- Customer registration with automatic profile creation
- Customer login with last login tracking
- Session management with customer profile data
- Secure logout functionality

## Endpoints

### 1. Register Customer

**POST** `/register`

Creates a new customer account and profile.

#### Request Body

```typescript
{
  name: string;           // Required: 1-100 characters
  email: string;          // Required: Valid email format
  password: string;       // Required: Minimum 6 characters
  dateOfBirth?: string;   // Optional: ISO date string
  gender?: "MALE" | "FEMALE" | "PREFER_NOT_TO_SAY"; // Optional
}
```

#### Success Response (201)

```typescript
{
  success: true;
  message: "Account created successfully";
  token: string | null;  // JWT token for authentication
  customer: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    emailVerified: boolean;
    role: "CUSTOMER";
    profile: {
      id: string;
      totalOrders: number;
      totalSpent: number;
      lastLogin: Date;
      dateOfBirth?: Date | null;
      gender?: "MALE" | "FEMALE" | "PREFER_NOT_TO_SAY" | null;
    };
  };
}
```

#### Error Responses

- **400**: Validation failed or user already exists
- **500**: Internal server error

### 2. Login Customer

**POST** `/login`

Authenticates a customer and updates their last login timestamp.

#### Request Body

```typescript
{
  email: string; // Required: Valid email format
  password: string; // Required
}
```

#### Success Response (200)

```typescript
{
  success: true;
  message: "Login successful";
  token: string | null;  // JWT token for authentication
  customer: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    emailVerified: boolean;
    role: "CUSTOMER";
    profile: {
      id: string;
      totalOrders: number;
      totalSpent: number;
      lastLogin: Date;
      dateOfBirth?: Date | null;
      gender?: "MALE" | "FEMALE" | "PREFER_NOT_TO_SAY" | null;
    } | null;
  };
}
```

#### Error Responses

- **400**: Validation failed
- **401**: Invalid email or password
- **403**: Access denied (user exists but is not a customer)
- **500**: Internal server error

### 3. Get Session

**GET** `/session`

Retrieves the current customer session and profile information.

#### Headers

Include session cookies from previous login.

#### Success Response (200)

```typescript
{
  success: true;
  customer: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    emailVerified: boolean;
    role: "CUSTOMER";
    profile: {
      id: string;
      totalOrders: number;
      totalSpent: number;
      lastLogin: Date;
      dateOfBirth: Date | null;
      gender: "MALE" | "FEMALE" | "PREFER_NOT_TO_SAY" | null;
      cartItemsCount: number;
    } | null;
  };
}
```

#### Error Responses

- **401**: Not authenticated
- **403**: Access denied (user is not a customer)
- **500**: Internal server error

### 4. Logout Customer

**POST** `/logout` or **GET** `/logout`

Logs out the current customer and invalidates their session.

#### Success Response (200)

```typescript
{
  success: true;
  message: "Logged out successfully";
}
```

#### Error Responses

- **500**: Failed to logout

## TypeScript Integration

### Installation

The API client is available in the project:

```typescript
import { customerAuth } from "@/lib/customer-auth-client";
import type {
  CustomerLoginRequest,
  CustomerRegisterRequest,
} from "@/types/customer-auth";
```

### Usage Examples

#### Register a new customer

```typescript
const registerData: CustomerRegisterRequest = {
  name: "John Doe",
  email: "john@example.com",
  password: "securepassword123",
  dateOfBirth: "1990-05-15",
  gender: "MALE",
};

const response = await customerAuth.register(registerData);

if (customerAuth.isError(response)) {
  console.error("Registration failed:", response.error);
} else {
  console.log("Welcome:", response.customer.name);
  console.log("JWT Token:", response.token);
  // Store token securely, redirect to dashboard, etc.
}
```

#### Login a customer

```typescript
const loginData: CustomerLoginRequest = {
  email: "john@example.com",
  password: "securepassword123",
};

const response = await customerAuth.login(loginData);

if (customerAuth.isError(response)) {
  console.error("Login failed:", response.error);
} else {
  console.log("Welcome back:", response.customer.name);
  console.log("JWT Token:", response.token);
  console.log("Total orders:", response.customer.profile?.totalOrders);
  // Store token securely for future API calls
}
```

#### Check current session

```typescript
const response = await customerAuth.getSession();

if (customerAuth.isError(response)) {
  // User is not logged in or not a customer
  console.log("Please log in");
} else {
  console.log("Current user:", response.customer.name);
  console.log("Cart items:", response.customer.profile?.cartItemsCount);
}
```

#### Logout

```typescript
const response = await customerAuth.logout();

if (customerAuth.isError(response)) {
  console.error("Logout failed:", response.error);
} else {
  console.log("Goodbye!");
  // Redirect to login page
}
```

## Frontend Integration

### React Hook Example

```typescript
import { useState, useEffect } from "react";
import { customerAuth } from "@/lib/customer-auth-client";
import type { CustomerUser, CustomerProfile } from "@/types/customer-auth";

export function useCustomerAuth() {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const response = await customerAuth.getSession();
    setLoading(false);

    if (!customerAuth.isError(response)) {
      setUser(response.user);
      setCustomer(response.customer);
    }
  };

  const login = async (credentials: CustomerLoginRequest) => {
    const response = await customerAuth.login(credentials);
    if (!customerAuth.isError(response)) {
      setUser(response.user);
      setCustomer(response.customer);
      return { success: true };
    }
    return { success: false, error: response.error };
  };

  const logout = async () => {
    await customerAuth.logout();
    setUser(null);
    setCustomer(null);
  };

  return {
    user,
    customer,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
```

### Next.js Middleware Integration

You can protect customer routes using Next.js middleware:

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Check if this is a customer route
  if (request.nextUrl.pathname.startsWith("/store")) {
    try {
      const sessionResponse = await fetch(
        `${request.nextUrl.origin}/api/customers/auth/session`,
        {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        }
      );

      if (!sessionResponse.ok) {
        // Redirect to login if not authenticated
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/store/:path*", "/profile/:path*", "/orders/:path*"],
};
```

## JWT Token Authentication

The authentication endpoints now provide **JWT tokens** for secure API access:

### Token Usage

After successful login or registration, you'll receive a JWT token that can be used for:

- API authentication without session cookies
- Mobile app authentication
- Cross-domain requests
- Stateless authentication

### Using the JWT Token

Include the JWT token in the `Authorization` header for authenticated requests:

```typescript
fetch("/api/some-protected-endpoint", {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

### Token Properties

- **Expiration**: 7 days (matches session expiration)
- **Algorithm**: RS256 (RSA signature)
- **Payload**: Contains user ID, email, name, role, and email verification status
- **Issuer**: Your Better Auth instance
- **Verification**: Can be verified using JWKS endpoint at `/api/auth/jwks`

### Token Verification

For backend services, you can verify JWT tokens using the JWKS endpoint:

```typescript
import { jwtVerify, createRemoteJWKSet } from "jose";

const JWKS = createRemoteJWKSet(new URL("http://localhost:3000/api/auth/jwks"));

const { payload } = await jwtVerify(token, JWKS, {
  issuer: "http://localhost:3000",
  audience: "http://localhost:3000",
});
```

## Security Features

1. **Role-based Access Control**: Only users with `CUSTOMER` role can access these endpoints
2. **JWT Token Authentication**: Secure, stateless authentication with RS256 signatures
3. **Email Domain Validation**: Configurable allowed email domains
4. **Session Management**: Secure session handling via better-auth
5. **Automatic Profile Creation**: Customer profiles are created automatically on registration
6. **Last Login Tracking**: Automatically updates customer last login timestamp
7. **JWKS Support**: Public key verification for JWT tokens

## Error Handling

All endpoints return consistent error responses:

```typescript
{
  error: string;
  issues?: Array<{
    code: string;
    path: (string | number)[];
    message: string;
  }>;
}
```

Common error scenarios:

- Invalid input validation
- Duplicate email registration
- Incorrect credentials
- Session expiration
- Role permission issues

## Database Migration

Since we added JWT support, you need to run a database migration to add the JWKS table:

```bash
npx @better-auth/cli migrate
```

Or add the following table to your Prisma schema:

```prisma
model Jwks {
  id         String   @id
  publicKey  String
  privateKey String
  createdAt  DateTime @default(now())

  @@map("jwks")
}
```

## CORS Configuration

Make sure your frontend URL is configured in the environment variables:

```bash
FRONTEND_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-secret-key-here"
```
