
import React from "react";
import { toast as sonnerToast } from "sonner";
import { Mail, Copy, Check } from "lucide-react";
import Button from "./CustomButtonComponent";

interface SuccessToastProps {
  title: string;
  description: string;
}

interface ErrorToastProps {
  title: string;
  errorMessage: string;
  formData: {
    name: string;
    message: string;
  };
}

export const showSuccessToast = ({ title, description }: SuccessToastProps) => {
  return sonnerToast.custom((t) => (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/20">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
          <Check className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600 whitespace-pre-line">{description}</p>
        </div>
      </div>
    </div>
  ), {
    duration: 6000,
    className: "backdrop-blur-lg bg-black/5",
  });
};

export const showErrorToast = ({ title, errorMessage, formData }: ErrorToastProps) => {
  const copyToClipboard = () => {
    const textToCopy = `Hi Cointegrity team,

It seems your contact form hit a snag.

[My message]
${formData.message}

The error message that was displayed was:
${errorMessage}

Kind regards
${formData.name}`;

    navigator.clipboard.writeText(textToCopy);
    
    // Show a brief confirmation toast
    sonnerToast.success("Copied to clipboard!", {
      duration: 2000,
      position: "bottom-center",
      className: "bg-white/90 backdrop-blur-md"
    });
  };

  return sonnerToast.custom((t) => (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg border border-rose-100/30">
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-start gap-3 w-full">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-400 to-red-500 flex items-center justify-center flex-shrink-0">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 mb-4">
              It seems we've hit a snag... 😅<br />
              Something went wrong and your message didn't make it through.
            </p>
            <div className="my-4">
              <p className="text-sm text-gray-600 mb-1">What happened:</p>
              <code className="block bg-gray-100 p-3 rounded-md text-sm text-red-500 whitespace-pre-wrap break-words">
                {errorMessage}
              </code>
            </div>
            <p className="text-gray-600 mb-4">
              No worries—you can copy everything you wrote (including this error) and email us directly at{" "}
              <a 
                href="mailto:hello@cointegrity.io" 
                className="text-[#cb46b3] hover:text-[#a53a91] underline"
              >
                hello@cointegrity.io
              </a>. Just click the button below to copy your message and error details, and paste it into your email (Ctrl + v)
            </p>
          </div>
        </div>
        <Button 
          variant="cta-primary" 
          onClick={copyToClipboard}
          className="ml-auto flex items-center gap-2"
        >
          <Copy size={16} />
          Copy Message Details
        </Button>
      </div>
    </div>
  ), {
    duration: 15000,
    className: "backdrop-blur-lg bg-black/5", 
  });
};
