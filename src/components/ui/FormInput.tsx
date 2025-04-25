
import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  isTextArea?: boolean;
}

const FormInput = ({ label, isTextArea, ...props }: FormInputProps) => {
  const inputClasses = "w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800";
  
  return (
    <div className="col-span-1">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
          className={inputClasses}
        />
      ) : (
        <input
          {...props as React.InputHTMLAttributes<HTMLInputElement>}
          className={inputClasses}
        />
      )}
    </div>
  );
};

export default FormInput;
