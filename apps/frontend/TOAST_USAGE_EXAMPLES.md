# Toast Usage Examples

## Option 1: Current Complex Toast (Already Set Up)

### Setup (Already Done)
```typescript
// app/layout.tsx - Already has <Toaster />
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster /> {/* Already here! */}
      </body>
    </html>
  );
}
```

### Usage
```typescript
// In any component
import { useToast } from "@/hooks/use-toast";

function MyComponent() {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Success!",
      description: "Website added successfully",
    });
  };

  const handleError = () => {
    toast({
      title: "Error",
      description: "Something went wrong",
      variant: "destructive",
    });
  };

  return (
    <>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
    </>
  );
}
```

---

## Option 2: Simple Toast (New, Easier to Understand)

### Setup (One-Time)
```typescript
// app/layout.tsx - Replace <Toaster /> with <SimpleToaster />
import { SimpleToaster } from "@/components/SimpleToaster";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SimpleToaster /> {/* Use this instead */}
      </body>
    </html>
  );
}
```

### Usage (Same API!)
```typescript
// In any component
import { useSimpleToast } from "@/hooks/use-simple-toast";

function MyComponent() {
  const { showToast } = useSimpleToast();

  const handleSuccess = () => {
    showToast({
      title: "Success!",
      description: "Website added successfully",
      variant: "success", // Optional: "default" | "success" | "destructive"
    });
  };

  const handleError = () => {
    showToast({
      title: "Error",
      description: "Something went wrong",
      variant: "destructive",
    });
  };

  return (
    <>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
    </>
  );
}
```

---

## Real-World Example: Dashboard

### Current Implementation (Complex Toast)
```typescript
// apps/frontend/app/dashboard/page.tsx
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      await addWebsite(data.url);
      toast({
        title: "Website added",
        description: "Your website is now being monitored.",
      });
    } catch (error) {
      toast({
        title: "Error adding website",
        description: error.message,
        variant: "destructive",
      });
    }
  };
}
```

### Simple Implementation (Simple Toast)
```typescript
// Same file, just change the import
import { useSimpleToast } from "@/hooks/use-simple-toast";

export default function Dashboard() {
  const { showToast } = useSimpleToast(); // Changed here

  const onSubmit = async (data) => {
    try {
      await addWebsite(data.url);
      showToast({ // Changed here
        title: "Website added",
        description: "Your website is now being monitored.",
        variant: "success", // Added success variant
      });
    } catch (error) {
      showToast({ // Changed here
        title: "Error adding website",
        description: error.message,
        variant: "destructive",
      });
    }
  };
}
```

---

## Comparison

| Feature | Complex Toast | Simple Toast |
|---------|--------------|-------------|
| **Import** | `useToast` | `useSimpleToast` |
| **Function** | `toast()` | `showToast()` |
| **Variants** | `default`, `destructive` | `default`, `success`, `destructive` |
| **Setup** | Already done | Need to add `<SimpleToaster />` |
| **Code Size** | 186 lines | 30 lines |
| **Understanding** | Complex | Simple |

---

## Which Should You Use?

### Keep Current (Complex Toast) if:
- ✅ It's already working
- ✅ You don't need to understand the internals
- ✅ You need advanced features (update toasts, actions)

### Switch to Simple Toast if:
- ✅ You want to understand how it works
- ✅ You're learning React
- ✅ You want simpler code
- ✅ You only need basic success/error messages

---

## Migration Guide

To switch from complex to simple toast:

1. **Update layout.tsx:**
```typescript
// Change this:
import { Toaster } from "@/components/ui/toaster";
<Toaster />

// To this:
import { SimpleToaster } from "@/components/SimpleToaster";
<SimpleToaster />
```

2. **Update all components:**
```typescript
// Change this:
import { useToast } from "@/hooks/use-toast";
const { toast } = useToast();
toast({ title: "..." });

// To this:
import { useSimpleToast } from "@/hooks/use-simple-toast";
const { showToast } = useSimpleToast();
showToast({ title: "..." });
```

3. **That's it!** Same API, simpler code.

