const Input = ({
  label,
  error,
  helperText,
  required = false,
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`
            block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary 
            sm:text-sm bg-white transition-colors
            ${error ? 'border-red-300 focus:ring-red-200 focus:border-red-500' : ''} 
            ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

const Textarea = ({
  label,
  error,
  helperText,
  required = false,
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`
            block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary 
            sm:text-sm bg-white transition-colors
            ${error ? 'border-red-300 focus:ring-red-200 focus:border-red-500' : ''} 
            ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export { Input, Textarea };
export default Input;


