export default function Button({ children, type, className, ...props }) {
  return (
    <button
      type={type}
      className={` text-white p-2 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
