const Button: React.FC<{ 
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ variant = 'primary', children, onClick }) => {
  const baseClasses = "flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]}`}
      onClick={onClick}
    >
      <span className="truncate">{children}</span>
    </button>
  );
};

export default Button;