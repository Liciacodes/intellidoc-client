import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import LogoIcon from "../ui/LogoIcon";
import NavLink from "../ui/NavLink";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="px-4 lg:px-10">
          <div className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-gray-800 px-4 lg:px-10 py-3 transition-colors duration-300">
            {/* Logo and Title */}
            <div className="flex items-center gap-4 text-gray-900 dark:text-white transition-colors duration-300">
              <LogoIcon showText={true} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center gap-6 lg:gap-8">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#how-it-works">How it Works</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* <ThemeToggle /> */}
              <Button variant="primary" onClick={() => navigate('/register')}>
                Sign Up
              </Button>
              <Button variant="secondary" onClick={() => navigate('/login')}>
                Log In
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-background-light dark:bg-background-dark">
            {/* Close button at top right of mobile menu */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col items-center py-8 px-6 space-y-6">
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col items-center space-y-6 w-full">
                <a
                  href="#features"
                  className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary transition-colors py-2 w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary transition-colors py-2 w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How it Works
                </a>
                <a
                  href="#pricing"
                  className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary transition-colors py-2 w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary transition-colors py-2 w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </a>
              </nav>

              {/* Divider */}
              <div className="w-full border-t border-gray-200  my-4"></div>

              {/* Mobile Buttons */}
              <div className="flex flex-col space-y-4 w-full max-w-xs">
                <Button
                  variant="primary"
                
                  onClick={() => handleNavigation('/register')}
                >
                  Sign Up
                </Button>
                <Button
                  variant="secondary"
               
                  onClick={() => handleNavigation('/login')}
                >
                  Log In
                </Button>
              </div>

              {/* Close hint */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                Tap anywhere outside to close
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;