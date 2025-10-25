const Button: React.FC<{ 
  variant?: 'primary' | 'secondary'| 'special';
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ variant = 'primary', children, onClick }) => {
  const baseClasses = "flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-gray-800 text-gray-900 text-white  hover:bg-gray-700",
    special: 'self-center md:self-start flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors'
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