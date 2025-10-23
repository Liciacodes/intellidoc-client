import Button from "../ui/Button";
import LogoIcon from "../ui/LogoIcon";
import NavLink from "../ui/NavLink";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
      <div className="px-4 lg:px-10">
        <div className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-gray-800 px-4 lg:px-10 py-3">
          <div className="flex items-center gap-4 text-gray-900 dark:text-white">
           <LogoIcon/>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">IntelliDoc</h2>
          </div>
          
          <nav className="hidden md:flex flex-1 justify-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How it Works</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="primary">Sign Up</Button>
            <Button variant="secondary">Log In</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;