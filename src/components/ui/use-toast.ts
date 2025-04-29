
// This file now serves as a redirect for compatibility with shadcn/ui components
// but we're actually using sonner for toasts in this project
import { toast } from "sonner";

// Re-export the toast function from sonner
export { toast };

// Dummy useToast function to maintain compatibility with any code that expects shadcn toast
export const useToast = () => {
  return {
    toast,
    toasts: [],
    dismiss: () => {}
  };
};
