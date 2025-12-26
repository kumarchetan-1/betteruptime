# Dashboard Page Design Prompt for AI Agent

## 🎯 Objective
Design and implement a comprehensive uptime monitoring dashboard page for a website monitoring application. The dashboard should display all monitored websites, their current status, and allow users to add new websites to monitor.

---

## 📋 Backend API Specifications

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication
- **Method:** Bearer Token (JWT)
- **Header Format:** `Authorization: Bearer <token>`
- **Token Storage:** Stored in `localStorage.getItem("token")`
- **Token Extraction:** The backend extracts user ID from JWT token and attaches it to `req.userId`

### API Endpoints

#### 1. Get All Websites
**Endpoint:** `GET /websites`
**Auth:** Required (Bearer token)
**Response:**
```json
{
  "websites": [
    {
      "id": "uuid-string",
      "url": "https://example.com",
      "user_id": "uuid-string",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 2. Get Website Status
**Endpoint:** `GET /website/status/:websiteId`
**Auth:** Required (Bearer token)
**Response:**
```json
{
  "website": {
    "id": "uuid-string",
    "url": "https://example.com",
    "user_id": "uuid-string",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "ticks": [
      {
        "id": "uuid-string",
        "status": "up" | "down" | "unknown",
        "responseTime_ms": 150,
        "website_id": "uuid-string",
        "region_id": "uuid-string",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

#### 3. Add New Website
**Endpoint:** `POST /website`
**Auth:** Required (Bearer token)
**Request Body:**
```json
{
  "url": "https://example.com"
}
```
**Response:**
```json
{
  "id": "uuid-string"
}
```

---

## 🗄️ Data Models

### Website Model
```typescript
{
  id: string;           // UUID
  url: string;          // Website URL to monitor
  user_id: string;      // UUID of the user who owns this website
  createdAt: DateTime;  // ISO timestamp
  ticks: WebsiteTick[]; // Array of monitoring ticks (optional, only in status endpoint)
}
```

### WebsiteTick Model
```typescript
{
  id: string;              // UUID
  status: "up" | "down" | "unknown";
  responseTime_ms: number; // Response time in milliseconds
  website_id: string;      // UUID reference to Website
  region_id: string;       // UUID reference to Region
  createdAt: DateTime;     // ISO timestamp
}
```

### WebsiteStatus Enum
```typescript
"up" | "down" | "unknown"
```

---

## 🎨 Design Requirements

### Page Structure
1. **Header Section**
   - Page title: "Dashboard" or "My Websites"
   - User welcome message (optional)
   - Navigation to other pages (if needed)

2. **Add Website Section**
   - Form/modal to add new website
   - Input field for URL
   - Submit button
   - Validation: URL format required
   - Success/error feedback

3. **Websites List Section**
   - Display all websites in a grid or list
   - Each website card should show:
     - Website URL
     - Current status (up/down/unknown) with visual indicator
     - Last check time (if available)
     - Response time (if available)
     - "View Details" or "View Status" button/link

4. **Empty State**
   - Show when user has no websites
   - Message: "No websites monitored yet"
   - Call-to-action to add first website

### Visual Design
- Use the existing design system from `globals.css`
- Dark theme with glassmorphism effects
- Use Tailwind CSS classes
- Status indicators:
  - **Up:** Green color with checkmark
  - **Down:** Red color with X mark
  - **Unknown:** Gray/yellow color with question mark
- Responsive design (mobile, tablet, desktop)

### Components to Use
- Use existing UI components from `@/components/ui/`
- Form components: `Form`, `FormField`, `FormControl`, `Input`, `Button`
- Card components for website display
- Icons from `lucide-react`

---

## 🔧 Technical Requirements

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form + Zod (optional, or use simple state)
- **Routing:** Next.js `useRouter` from `next/navigation`

### File Location
- Create at: `apps/frontend/app/dashboard/page.tsx`
- Use client component: `"use client"`

### State Management
- Fetch websites on component mount
- Store websites in React state
- Handle loading and error states
- Refresh data after adding new website

### Error Handling
- Handle 401 (unauthorized) - redirect to signin
- Handle 400/404 (not found/error) - show error message
- Handle network errors gracefully

### Authentication Flow
```typescript
// Get token from localStorage
const token = localStorage.getItem("token");

// Include in axios requests
axios.get(`${BACKEND_URL}/api/v1/websites`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// If 401, redirect to signin
if (error.response?.status === 401) {
  router.push("/signin");
}
```

---

## 📝 Implementation Checklist

### Core Features
- [ ] Fetch and display all websites on page load
- [ ] Show loading state while fetching
- [ ] Show empty state when no websites
- [ ] Display website status (up/down/unknown)
- [ ] Show response time if available
- [ ] Add new website functionality
- [ ] Form validation for URL input
- [ ] Success/error notifications
- [ ] Refresh website list after adding

### UI/UX Features
- [ ] Responsive grid/list layout
- [ ] Status indicators with colors
- [ ] Hover effects on website cards
- [ ] Loading skeletons/spinners
- [ ] Error messages display
- [ ] Success feedback on add

### Navigation
- [ ] Link to individual website detail page (if exists)
- [ ] Navigation to other pages (sign out, etc.)

---

## 🎯 Example User Flow

1. User lands on `/dashboard`
2. Page checks for authentication token
3. If no token → redirect to `/signin`
4. If token exists → fetch websites from API
5. Display websites in a grid/list
6. User clicks "Add Website" button
7. Modal/form opens with URL input
8. User enters URL and submits
9. API call to create website
10. On success → refresh website list, show success message
11. On error → show error message

---

## 🔗 Related Pages/Components

- **Sign In:** `/signin` - User authenticates here
- **Sign Up:** `/signup` - User registers here
- **Website Detail:** `/website/[websiteId]` - View detailed status (if exists)
- **Navbar:** Should include navigation and user menu

---

## 📊 Example API Response Handling

```typescript
// Fetch websites
const fetchWebsites = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BACKEND_URL}/api/v1/websites`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setWebsites(response.data.websites);
  } catch (error) {
    if (error.response?.status === 401) {
      router.push("/signin");
    } else {
      setError("Failed to fetch websites");
    }
  }
};

// Add website
const addWebsite = async (url: string) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(`${BACKEND_URL}/api/v1/website`, 
      { url },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Refresh list
    fetchWebsites();
  } catch (error) {
    // Handle error
  }
};
```

---

## 🎨 Design Inspiration

- Modern, clean dashboard layout
- Card-based design for websites
- Status badges with icons
- Smooth animations and transitions
- Glassmorphism effects (from your design system)
- Gradient accents for primary actions

---

## ✅ Success Criteria

The dashboard should:
1. Successfully authenticate and fetch user's websites
2. Display all websites with their current status
3. Allow users to add new websites
4. Handle errors gracefully
5. Provide good user feedback (loading, success, errors)
6. Be responsive and visually appealing
7. Follow the existing design system

---

## 📝 Notes

- The backend automatically filters websites by `user_id` from the JWT token
- Users can only see their own websites
- Website status comes from the latest `WebsiteTick` entry
- Response time is in milliseconds
- All timestamps are in ISO format

