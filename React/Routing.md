# Q. What is React Router and Why do we need it?
# Ans:
React Router is a library used for navigation between different pages/components in a React application without reloading the entire page.

It enables Single Page Application (SPA) behavior.

Without React router:
Home
   ↓ Click
Browser Reload
   ↓
About
Every navigation triggers a full page refresh.

With React Router

Home
   ↓ Click
URL Changes
   ↓
Component Changes

No page reload fast user experience

installation:
# npm install react-router-dom
# Basic Setup
# App.jsx
```jsx
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./Home";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />
      </Routes>
    </BrowserRouter>
  );
}
```

# Components
BrowserRouter

Wraps the application and enables routing.
```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

Routes

Container for all routes.
<Routes>
  ...
</Routes>

Route

Maps URL to component.
```jsx
<Route
  path="/about"
  element={<About />}
/>
```
Navigation
Link

Instead of: <a href="/Javascript/Advance.md"></a>

<Link to="/about">
  About
</Link>
This precvents reload.

# Q. What is useNavigate?
Answer

useNavigate is a hook used for programmatic navigation.

Instead of clicking a Link, navigation happens through code.

# Q. What is useParams?
Answer

useParams is used to access dynamic route parameters from the URL.

```jsx
<Route
  path="/user/:id"
  element={<User />}
/>
  use this const { id } = useParams(); inside component to access id

```
# Q. What is a Protected Route?
Routes that can access only logged in users.

# Approach

User Tries To Access Route
          ↓
Check Authentication
          ↓
Authenticated?
     /          \
   Yes          No
    ↓            ↓
Show Page    Redirect Login

Create Protected Route Component
```jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated
    ? children
    : <Navigate to="/login" />;
}

export default ProtectedRoute;
```

# usage
```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

Multiple protected route
```jsx
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>
```

# Q. Is hiding routes enough for security?

Answer:

No.

Frontend route protection improves UX, but real security must be enforced on the backend.

Even if a route is hidden: