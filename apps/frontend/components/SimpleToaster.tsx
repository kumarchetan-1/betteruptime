/**
 * Simple Toast Component - Easy to Understand Version
 * 
 * This component displays all active toasts.
 * It reads from the useSimpleToast hook and renders them.
 * 
 * Usage:
 * 1. Add <SimpleToaster /> to your layout.tsx
 * 2. Use useSimpleToast() hook in any component
 * 3. Call showToast() to display a notification
 */

"use client";

import { useSimpleToast } from "@/hooks/use-simple-toast";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function SimpleToaster() {
  const { toasts, removeToast } = useSimpleToast();

  // Don't render anything if there are no toasts
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => {
        // Choose icon and colors based on variant
        const getVariantStyles = () => {
          switch (toast.variant) {
            case "destructive":
              return {
                bg: "bg-red-500 dark:bg-red-600",
                border: "border-red-600 dark:border-red-700",
                text: "text-white",
                icon: <AlertCircle className="w-5 h-5" />,
              };
            case "success":
              return {
                bg: "bg-green-500 dark:bg-green-600",
                border: "border-green-600 dark:border-green-700",
                text: "text-white",
                icon: <CheckCircle2 className="w-5 h-5" />,
              };
            default:
              return {
                bg: "bg-background",
                border: "border-border",
                text: "text-foreground",
                icon: <Info className="w-5 h-5" />,
              };
          }
        };

        const styles = getVariantStyles();

        return (
          <div
            key={toast.id}
            className={cn(
              "min-w-[300px] p-4 rounded-lg shadow-lg border",
              "animate-in slide-in-from-top-5 fade-in-0",
              styles.bg,
              styles.border,
              styles.text
            )}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="mt-0.5">{styles.icon}</div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{toast.title}</h4>
                {toast.description && (
                  <p className="text-sm mt-1 opacity-90">{toast.description}</p>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className={cn(
                  "opacity-70 hover:opacity-100 transition-opacity",
                  "p-1 rounded hover:bg-black/10 dark:hover:bg-white/10"
                )}
                aria-label="Close toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
