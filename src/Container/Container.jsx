export default function Container({ children, className = "" }) {
  return (
    <div className={`max-w-[90%] mx-auto my-10 ${className}`}>{children}</div>
  );
}
