
import React from "react";
import { PlaceholderData } from "@/utils/contactPlaceholders";

interface ContactFormFieldsProps {
  formState: {
    name: string;
    email: string;
    company: string;
    message: string;
  };
  currentPlaceholder: PlaceholderData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactFormFields = ({ formState, currentPlaceholder, handleChange }: ContactFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="col-span-1">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800"
          placeholder={currentPlaceholder.name}
        />
      </div>

      <div className="col-span-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800"
          placeholder={currentPlaceholder.email}
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company (Optional)
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formState.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800"
          placeholder={currentPlaceholder.company}
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800"
          placeholder={currentPlaceholder.message}
        />
      </div>
    </div>
  );
};

export default ContactFormFields;
