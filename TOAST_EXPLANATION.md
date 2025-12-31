# 🍞 Toast Notifications - Complete Guide

## What is a Toast?

A **toast** is a small notification that appears temporarily on your screen to show a message. Think of it like a popup that:
- Appears at the corner of your screen
- Shows a message (like "Website added successfully!")
- Disappears automatically after a few seconds
- Doesn't block your interaction with the page

**Real-world examples:**
- Gmail: "Email sent successfully"
- GitHub: "Repository cloned"
- Your app: "Website added to monitoring"

---

## How Toasts Work (Simple Explanation)

### 1. **The Toast System Has 3 Parts:**

```
┌─────────────────────────────────────┐
│  1. Toast Hook (useToast)          │
│     - Creates and manages toasts    │
│     - Like a "toast factory"        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  2. Toast Component (UI)            │
│     - Shows the actual toast         │
│     - The visual part                │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  3. Toaster Container               │
│     - Where toasts appear            │
│     - Usually top-right corner      │
└─────────────────────────────────────┘
```

### 2. **How You Use It:**

```typescript
// Step 1: Get the toast function
const { toast } = useToast();

// Step 2: Show a toast when something happens
toast({
  title: "Success!",
  description: "Website added successfully",
});
```

That's it! The toast appears automatically.

---

## Current Implementation (Complex)

Your current toast system uses:
- **Reducer pattern** (like Redux) - manages state
- **Global state** - shared across all components
- **Radix UI** - accessibility library
- **Auto-dismiss** - removes toasts after timeout

**Pros:**
- Very powerful
- Handles multiple toasts
- Accessible (screen reader friendly)
- Can update/dismiss toasts programmatically

**Cons:**
- Complex code (186 lines!)
- Hard to understand
- Overkill for simple use cases

---

## Simple Alternative (Easy to Understand)

Here's a much simpler version that does the same thing:

### Simple Toast Hook (30 lines instead of 186!)

```typescript
// hooks/use-simple-toast.ts
import { useState } from "react";

type Toast = {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useSimpleToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: {
    title: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => {
    // Create a new toast with unique ID
    const newToast: Toast = {
      id: Math.random().toString(36),
      ...message,
    };

    // Add it to the list
    setToasts((prev) => [...prev, newToast]);

    // Remove it after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, removeToast };
}
```

### Simple Toast Component

```typescript
// components/SimpleToast.tsx
"use client";

import { useSimpleToast } from "@/hooks/use-simple-toast";
import { X } from "lucide-react";

export function SimpleToaster() {
  const { toasts, removeToast } = useSimpleToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            min-w-[300px] p-4 rounded-lg shadow-lg border
            ${
              toast.variant === "destructive"
                ? "bg-red-500 text-white border-red-600"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
            }
          `}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold">{toast.title}</h4>
              {toast.description && (
                <p className="text-sm mt-1 opacity-90">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### How to Use (Same as Before!)

```typescript
// In any component
import { useSimpleToast } from "@/hooks/use-simple-toast";

function MyComponent() {
  const { showToast } = useSimpleToast();

  const handleClick = () => {
    showToast({
      title: "Success!",
      description: "Website added successfully",
    });
  };

  return <button onClick={handleClick}>Add Website</button>;
}
```

---

## Comparison: Complex vs Simple

| Feature | Complex (Current) | Simple (Alternative) |
|---------|------------------|----------------------|
| Lines of code | ~186 | ~30 |
| Easy to understand | ❌ No | ✅ Yes |
| Multiple toasts | ✅ Yes | ✅ Yes |
| Auto-dismiss | ✅ Yes | ✅ Yes |
| Update toasts | ✅ Yes | ❌ No (but rarely needed) |
| Accessibility | ✅ Full | ⚠️ Basic |
| Dependencies | Radix UI | None |

---

## When to Use Which?

### Use **Simple Toast** if:
- ✅ You just need success/error messages
- ✅ You want easy-to-understand code
- ✅ You're learning React
- ✅ Your app is small-medium size

### Use **Complex Toast** (current) if:
- ✅ You need advanced features (update toasts, actions)
- ✅ Accessibility is critical
- ✅ You have a large team/enterprise app
- ✅ You need fine-grained control

---

## Step-by-Step: How Toast Works

### Step 1: User Action
```typescript
// User clicks "Add Website" button
onClick={() => {
  addWebsite();
  toast({ title: "Success!" }); // ← Toast created here
}}
```

### Step 2: Toast Created
```typescript
// Inside toast() function:
const newToast = {
  id: "123",
  title: "Success!",
  open: true
};
// Add to state: toasts = [newToast]
```

### Step 3: Component Renders
```typescript
// Toaster component sees new toast in state
{toasts.map(toast => (
  <Toast>{toast.title}</Toast> // ← Shows on screen
))}
```

### Step 4: Auto-Dismiss
```typescript
// After 3 seconds:
setTimeout(() => {
  // Remove toast from state
  setToasts(prev => prev.filter(t => t.id !== "123"));
}, 3000);
// Toast disappears!
```

---

## Common Toast Patterns

### 1. Success Toast
```typescript
toast({
  title: "Success!",
  description: "Website added successfully",
});
```

### 2. Error Toast
```typescript
toast({
  title: "Error",
  description: "Failed to add website",
  variant: "destructive",
});
```

### 3. Info Toast
```typescript
toast({
  title: "Info",
  description: "Processing your request...",
});
```

---

## Summary

**Toast = Temporary notification that appears and disappears**

**Simple version:**
1. Create toast → Add to array
2. Show toast → Render from array
3. Remove toast → Filter from array

**That's it!** No need for complex reducers or global state management for simple use cases.

