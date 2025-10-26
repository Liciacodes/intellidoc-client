

import LogoIcon from "../ui/LogoIcon";
import SocialIcon from "../ui/SocialIcons";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-gray-900 dark:text-white">
            <LogoIcon />
          </div>

          <div className="flex gap-6 text-gray-500 dark:text-gray-400">
            <a className="hover:text-primary" href="#">
              About Us
            </a>
            <a className="hover:text-primary" href="#">
              Contact
            </a>
            <a className="hover:text-primary" href="#">
              Privacy Policy
            </a>
          </div>

          <div className="flex gap-4 text-gray-500 dark:text-gray-400">
            <SocialIcon platform="facebook" />
            <SocialIcon platform="twitter" />
            <SocialIcon platform="github" />
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="mt-8 text-center">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
          >
            <span className="material-symbols-outlined">arrow_upward</span>
            Back to Top
          </button>
        </div>

        <div className="mt-4 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
          © 2024 IntelliDoc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// import LogoIcon from "../ui/LogoIcon";
// import SocialIcon from "../ui/SocialIcons";

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-100 dark:bg-gray-900/50">
//       <div className="container mx-auto px-4 lg:px-10 py-12">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
//           <div className="flex items-center gap-4 text-gray-900 dark:text-white">
//             <LogoIcon/>
//           </div>
          
//           <div className="flex gap-6 text-gray-500 dark:text-gray-400">
//             <a className="hover:text-primary" href="#">About Us</a>
//             <a className="hover:text-primary" href="#">Contact</a>
//             <a className="hover:text-primary" href="#">Privacy Policy</a>
//           </div>
          
//           <div className="flex gap-4 text-gray-500 dark:text-gray-400">
//             <SocialIcon platform="facebook" />
//             <SocialIcon platform="twitter" />
//             <SocialIcon platform="github" />
//           </div>
//         </div>
        
//         <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
//           © 2024 IntelliDoc. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };
// export default Footer;