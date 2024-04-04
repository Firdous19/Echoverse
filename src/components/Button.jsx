export default function Button({ children, type, className, ...props }) {
  return (
    <button
      type={type}
      className={`bg-blue-700 text-white py-2 px-4 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
