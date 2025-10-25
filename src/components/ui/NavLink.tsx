import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  children, 
  className = "" 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a 
      href={href}
      onClick={handleClick}
      className={`text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal ${className}`}
    >
      {children}
    </a>
  );
};

export default NavLink;