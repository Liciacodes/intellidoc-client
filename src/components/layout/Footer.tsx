import LogoIcon from "../ui/LogoIcon";
import SocialIcon from "../ui/SocialIcons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-gray-900 dark:text-white">
            <LogoIcon/>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">IntelliDoc</h2>
          </div>
          
          <div className="flex gap-6 text-gray-500 dark:text-gray-400">
            <a className="hover:text-primary" href="#">About Us</a>
            <a className="hover:text-primary" href="#">Contact</a>
            <a className="hover:text-primary" href="#">Privacy Policy</a>
          </div>
          
          <div className="flex gap-4 text-gray-500 dark:text-gray-400">
            <SocialIcon platform="facebook" />
            <SocialIcon platform="twitter" />
            <SocialIcon platform="github" />
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
          © 2024 IntelliDoc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;