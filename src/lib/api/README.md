# Solacely API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Authentication](#authentication)
4. [API Services](#api-services)
5. [React Hooks](#react-hooks)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)
8. [Examples](#examples)

## Overview

This documentation covers the complete API integration layer for the Solacely frontend application. The API layer is organized into services, custom React hooks, and utilities that provide a clean interface for interacting with the backend.

### Architecture
```
src/lib/api/
├── config.js           # Axios configuration and interceptors
├── types.js            # Type definitions and constants
├── baseService.js      # Base service class
├── services/           # Feature-specific API services
│   ├── authService.js
│   ├── propertyService.js
│   ├── maintenanceService.js
│   ├── paymentService.js
│   └── userService.js
└── index.js           # Central exports

src/hooks/              # Custom React hooks for data fetching
├── useAuth.js
├── useProperties.js
├── useMaintenance.js
└── index.js

src/providers/
└── QueryProvider.jsx  # React Query provider setup
```

## Getting Started

### Environment Setup
Ensure your `.env.local` file contains:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NODE_ENV=development
```

### Dependencies
- `axios` - HTTP client
- `@tanstack/react-query` - Server state management

### Provider Setup
The `QueryProvider` is already configured in your root layout:
```jsx
import Providers from "@/providers/QueryProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

## Authentication

### Auth Service Methods
All authentication-related API calls are handled by `authService.js`.

#### Available Methods:
- `register(userData)` - User registration
- `login(credentials)` - User login
- `logout()` - User logout
- `verifyAccount(verificationData)` - Email/phone verification
- `resendVerificationCode(data)` - Resend verification code
- `forgotPassword(email)` - Request password reset
- `resetPassword(resetData)` - Reset password with token
- `changePassword(passwordData)` - Change current password
- `refreshToken()` - Refresh authentication token
- `getProfile()` - Get current user profile
- `updateProfile(profileData)` - Update user profile
- `uploadProfileImage(file)` - Upload profile image

#### Token Management
Tokens are automatically managed:
- Stored in `localStorage` as `authToken`
- Automatically added to request headers
- Cleared on logout or 401 errors

## API Services

### 1. Auth Service (`authService.js`)

#### Login
```javascript
import { authService } from '@/lib/api';

try {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password123'
  });
  console.log('Login successful:', response.data);
} catch (error) {
  console.error('Login failed:', error.message);
}
```

#### Register
```javascript
const response = await authService.register({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  confirmPassword: 'password123'
});
```

#### Verify Account
```javascript
const response = await authService.verifyAccount({
  email: 'user@example.com',
  code: '123456'
});
```

### 2. Property Service (`propertyService.js`)

#### Get Properties
```javascript
import { propertyService } from '@/lib/api';

// Get all properties with filters
const properties = await propertyService.getProperties({
  location: 'Lagos',
  minPrice: 50000,
  maxPrice: 200000,
  propertyType: 'apartment',
  page: 1,
  limit: 10
});

// Get single property
const property = await propertyService.getProperty('property-id');

// Search properties
const searchResults = await propertyService.searchProperties({
  query: 'luxury apartment',
  location: 'Lagos'
});
```

#### Favorites
```javascript
// Add to favorites
await propertyService.addToFavorites('property-id');

// Remove from favorites
await propertyService.removeFromFavorites('property-id');

// Get user's favorites
const favorites = await propertyService.getFavorites();
```

### 3. Maintenance Service (`maintenanceService.js`)

#### Create Maintenance Request
```javascript
import { maintenanceService } from '@/lib/api';

const request = await maintenanceService.createMaintenanceRequest({
  propertyId: 'property-id',
  title: 'Plumbing Issue',
  description: 'Leaking faucet in kitchen',
  priority: 'medium',
  category: 'plumbing'
});
```

#### Get Maintenance Requests
```javascript
// Get all requests
const requests = await maintenanceService.getMaintenanceRequests({
  status: 'pending',
  page: 1,
  limit: 10
});

// Get requests by status
const pendingRequests = await maintenanceService.getMaintenanceRequestsByStatus('pending');

// Get single request
const request = await maintenanceService.getMaintenanceRequest('request-id');
```

### 4. Payment Service (`paymentService.js`)

#### Process Payment
```javascript
import { paymentService } from '@/lib/api';

// Initialize payment
const payment = await paymentService.initializePayment({
  amount: 100000,
  currency: 'NGN',
  propertyId: 'property-id',
  paymentType: 'rent'
});

// Verify payment
const verification = await paymentService.verifyPayment('payment-reference');
```

#### Payment History
```javascript
const history = await paymentService.getPaymentHistory({
  startDate: '2025-01-01',
  endDate: '2025-12-31',
  status: 'completed'
});
```

### 5. User Service (`userService.js`)

#### Dashboard Data
```javascript
import { userService } from '@/lib/api';

const dashboardData = await userService.getDashboardData();
```

#### User Preferences
```javascript
// Get preferences
const preferences = await userService.getPreferences();

// Update preferences
await userService.updatePreferences({
  notifications: {
    email: true,
    sms: false,
    push: true
  },
  language: 'en',
  currency: 'NGN'
});
```

## React Hooks

### Authentication Hooks (`useAuth.js`)

#### useLogin
```javascript
import { useLogin } from '@/hooks';

function LoginComponent() {
  const loginMutation = useLogin();

  const handleLogin = async (credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // Redirect to dashboard
    } catch (error) {
      // Handle error
    }
  };

  return (
    <button 
      onClick={() => handleLogin({ email, password })}
      disabled={loginMutation.isLoading}
    >
      {loginMutation.isLoading ? 'Logging in...' : 'Login'}
    </button>
  );
}
```

#### useProfile
```javascript
import { useProfile } from '@/hooks';

function ProfileComponent() {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Welcome, {profile?.data?.firstName}</h1>
      <p>{profile?.data?.email}</p>
    </div>
  );
}
```

### Property Hooks (`useProperties.js`)

#### useProperties
```javascript
import { useProperties } from '@/hooks';

function PropertiesList() {
  const { 
    data: properties, 
    isLoading, 
    error,
    refetch 
  } = useProperties({
    location: 'Lagos',
    propertyType: 'apartment'
  });

  if (isLoading) return <div>Loading properties...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {properties?.data?.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

#### useAddToFavorites
```javascript
import { useAddToFavorites } from '@/hooks';

function PropertyCard({ property }) {
  const addToFavoritesMutation = useAddToFavorites();

  const handleAddToFavorites = () => {
    addToFavoritesMutation.mutate(property.id, {
      onSuccess: () => {
        // Show success message
      },
      onError: (error) => {
        // Show error message
      }
    });
  };

  return (
    <div>
      <h3>{property.title}</h3>
      <button 
        onClick={handleAddToFavorites}
        disabled={addToFavoritesMutation.isLoading}
      >
        {addToFavoritesMutation.isLoading ? 'Adding...' : 'Add to Favorites'}
      </button>
    </div>
  );
}
```

### Maintenance Hooks (`useMaintenance.js`)

#### useMaintenanceRequests
```javascript
import { useMaintenanceRequests } from '@/hooks';

function MaintenanceList() {
  const { 
    data: requests, 
    isLoading, 
    error 
  } = useMaintenanceRequests({
    status: 'pending'
  });

  return (
    <div>
      {requests?.data?.map(request => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
```

#### useCreateMaintenanceRequest
```javascript
import { useCreateMaintenanceRequest } from '@/hooks';

function CreateRequestForm() {
  const createRequestMutation = useCreateMaintenanceRequest();

  const handleSubmit = async (formData) => {
    try {
      await createRequestMutation.mutateAsync(formData);
      // Close form, show success
    } catch (error) {
      // Show error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button 
        type="submit"
        disabled={createRequestMutation.isLoading}
      >
        {createRequestMutation.isLoading ? 'Creating...' : 'Create Request'}
      </button>
    </form>
  );
}
```

## Error Handling

### Global Error Handling
Errors are handled automatically by the axios interceptors in `config.js`:

- **401 Unauthorized**: Automatically clears tokens and redirects to login
- **403 Forbidden**: Logs access forbidden error
- **404 Not Found**: Logs resource not found
- **500 Server Error**: Logs internal server error
- **Network Errors**: Logs network connectivity issues

### Custom Error Handling in Components
```javascript
import { useProperties } from '@/hooks';

function PropertiesList() {
  const { data, isLoading, error } = useProperties();

  if (error) {
    // Handle specific error types
    if (error.status === 404) {
      return <div>No properties found</div>;
    }
    if (error.status === 500) {
      return <div>Server error. Please try again later.</div>;
    }
    return <div>Error: {error.message}</div>;
  }

  // Rest of component
}
```

### Mutation Error Handling
```javascript
const mutation = useMutation({
  mutationFn: someApiCall,
  onError: (error) => {
    if (error.status === 422) {
      // Validation errors
      setFormErrors(error.errors);
    } else {
      // Other errors
      showToast(error.message, 'error');
    }
  },
  onSuccess: () => {
    showToast('Operation successful', 'success');
  }
});
```

## Best Practices

### 1. Use React Query for All API Calls
- Don't use `useEffect` with manual API calls
- Use the provided hooks for data fetching
- Leverage React Query's caching and synchronization

### 2. Handle Loading States
```javascript
function MyComponent() {
  const { data, isLoading, error } = useProperties();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <PropertyList properties={data} />;
}
```

### 3. Optimistic Updates
```javascript
const updateMutation = useMutation({
  mutationFn: updateProperty,
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['properties']);
    
    // Snapshot previous value
    const previousData = queryClient.getQueryData(['properties']);
    
    // Optimistically update
    queryClient.setQueryData(['properties'], old => {
      return { ...old, ...newData };
    });
    
    return { previousData };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['properties'], context.previousData);
  },
  onSettled: () => {
    // Refetch after mutation
    queryClient.invalidateQueries(['properties']);
  },
});
```

### 4. Query Key Management
Use consistent query keys for better cache management:
```javascript
// Good - consistent structure
const QUERY_KEYS = {
  properties: ['properties'],
  property: (id) => ['properties', id],
  userProperties: (userId) => ['users', userId, 'properties'],
};

// Use in hooks
useQuery({
  queryKey: QUERY_KEYS.property(propertyId),
  queryFn: () => propertyService.getProperty(propertyId),
});
```

### 5. Environment-Specific Configuration
```javascript
// In config.js
const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_PROD_API_URL 
    : process.env.NEXT_PUBLIC_API_BASE_URL,
  TIMEOUT: process.env.NODE_ENV === 'production' ? 15000 : 10000,
};
```

## Examples

### Complete Login Flow
```javascript
// components/LoginForm.jsx
import { useState } from 'react';
import { useLogin } from '@/hooks';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const loginMutation = useLogin();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(credentials);
      router.push('/dashboard');
    } catch (error) {
      // Error is already handled by the mutation
      console.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
        placeholder="Password"
        required
      />
      <button 
        type="submit" 
        disabled={loginMutation.isLoading}
      >
        {loginMutation.isLoading ? 'Logging in...' : 'Login'}
      </button>
      {loginMutation.error && (
        <div className="error">
          {loginMutation.error.message}
        </div>
      )}
    </form>
  );
}
```

### Property Search with Filters
```javascript
// components/PropertySearch.jsx
import { useState } from 'react';
import { useSearchProperties } from '@/hooks';

export default function PropertySearch() {
  const [filters, setFilters] = useState({
    query: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: ''
  });

  const { 
    data: properties, 
    isLoading, 
    error 
  } = useSearchProperties(filters);

  return (
    <div>
      {/* Filter form */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search properties..."
          value={filters.query}
          onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
        />
        <select
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
        >
          <option value="">All Locations</option>
          <option value="Lagos">Lagos</option>
          <option value="Abuja">Abuja</option>
        </select>
        {/* More filters */}
      </div>

      {/* Results */}
      {isLoading && <div>Searching...</div>}
      {error && <div>Error: {error.message}</div>}
      {properties && (
        <div className="results">
          {properties.data.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### Maintenance Request Creation
```javascript
// components/CreateMaintenanceRequest.jsx
import { useState } from 'react';
import { useCreateMaintenanceRequest } from '@/hooks';

export default function CreateMaintenanceRequest({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    propertyId: ''
  });

  const createRequestMutation = useCreateMaintenanceRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequestMutation.mutateAsync(formData);
      onSuccess?.();
      setFormData({ title: '', description: '', priority: 'medium', category: '', propertyId: '' });
    } catch (error) {
      console.error('Failed to create request');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Request Title"
        value={formData.title}
        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        required
      />
      <select
        value={formData.priority}
        onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
      <button 
        type="submit" 
        disabled={createRequestMutation.isLoading}
      >
        {createRequestMutation.isLoading ? 'Creating...' : 'Create Request'}
      </button>
    </form>
  );
}
```

---

This documentation provides a complete reference for using the API integration layer in your Solacely application. Keep this file updated as you add new endpoints or modify existing ones.
