// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../ui/Button";
// import LogoIcon from "../ui/LogoIcon";
// import NavLink from "../ui/NavLink";

// const Header: React.FC = () => {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <header className="bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           {/* Logo and Title */}
//           <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//             <LogoIcon />
//             <h1 className="font-display text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
//               IntelliDoc
//             </h1>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-6 lg:gap-8">
//             <NavLink href="#features">Features</NavLink>
//             <NavLink href="#how-it-works">How it Works</NavLink>
//             <NavLink href="#pricing">Pricing</NavLink>
//             <NavLink href="#testimonials">Testimonials</NavLink>
//           </nav>

//           {/* Desktop Right Section */}
//           <div className="hidden md:flex items-center gap-3 lg:gap-4">
//             <Button
//               variant="outline"
//               onClick={() => navigate('/login')}
//               className="px-4 lg:px-6"
//             >
//               Log In
//             </Button>
//             <Button
//               variant="primary"
//               onClick={() => navigate('/register')}
//               className="px-4 lg:px-6"
//             >
//               Sign Up
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={toggleMobileMenu}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//             aria-label="Toggle menu"
//           >
//             <span className="material-symbols-outlined text-2xl text-gray-700 dark:text-gray-300">
//               {isMobileMenuOpen ? 'close' : 'menu'}
//             </span>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
//             <nav className="flex flex-col gap-4">
//               <NavLink href="#features" onClick={closeMobileMenu}>
//                 Features
//               </NavLink>
//               <NavLink to="#how-it-works" onClick={closeMobileMenu}>
//                 How it Works
//               </NavLink>
//               <NavLink to="#pricing" onClick={closeMobileMenu}>
//                 Pricing
//               </NavLink>
//               <NavLink to="#testimonials" onClick={closeMobileMenu}>
//                 Testimonials
//               </NavLink>
              
//               {/* Mobile Auth Buttons */}
//               <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
//                 <Button
//                   variant="primary"
//                   onClick={() => {
//                     closeMobileMenu();
//                     navigate('/login');
//                   }}
//                   className="w-full"
//                 >
//                   Log In
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   onClick={() => {
//                     closeMobileMenu();
//                     navigate('/register');
//                   }}
//                   className="w-full"
//                 >
//                   Sign Up
//                 </Button>
//               </div>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import LogoIcon from "../ui/LogoIcon";
import NavLink from "../ui/NavLink";


const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <header
      className="
      sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm
      "
    >
      <div className="px-4 lg:px-10">
        <div
          className="
            flex items-center justify-between whitespace-nowrap 
            border-b border-gray-200 dark:border-gray-800 
            px-4 lg:px-10 py-3 transition-colors duration-300
          "
        >
          {/* Logo and Title */}
          <div className="flex items-center gap-4 text-gray-900 dark:text-white transition-colors duration-300">
            <LogoIcon showText={true} />
            {/* <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
              IntelliDoc
            </h2> */}
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex flex-1 justify-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How it Works</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <Button variant="primary" onClick={() => navigate('/register')}>Sign Up</Button>
            <Button variant="secondary" onClick={() => navigate('/login')}>Log In</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
