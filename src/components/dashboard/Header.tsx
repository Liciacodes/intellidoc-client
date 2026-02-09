import { useLocation, useNavigate } from "react-router-dom";
import { useDocumentStore } from "../../store/useDocumentStore";
import { useUserStore } from "../../store/useUserStore";
import { useState } from "react";

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useDocumentStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query && location.pathname !== '/dashboard/my-document') {
      navigate('/dashboard/my-document');
    }
  };

  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 lg:px-8 py-3 md:py-4">
        {/* Mobile: Search Icon + App Name */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
            aria-label="Open search"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <h1 className="text-dashboard-text-light dark:text-dashboard-text-dark text-lg font-bold">
            IntelliDoc
          </h1>
        </div>

        {/* Desktop: Full Search Bar */}
        <label className="hidden lg:flex flex-col min-w-40 w-1/3 max-w-lg">
          <div className="flex w-full items-stretch rounded-lg h-10">
            <div className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark flex bg-dashboard-secondary dark:bg-dashboard-card-dark items-center justify-center pl-3 rounded-l-lg">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              type="text"
              placeholder="Search documents..."
              className="form-input flex w-full rounded-r-lg text-dashboard-text-light dark:text-dashboard-text-dark focus:outline-0 focus:ring-2 focus:ring-dashboard-primary/50 border-none bg-dashboard-secondary dark:bg-dashboard-card-dark h-full placeholder:text-dashboard-text-secondary-light dark:placeholder:text-dashboard-text-secondary-dark px-4 text-sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </label>

        {/* Right Side: Notifications + User Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notification Bell - Hidden on very small screens */}
          <button
            disabled
            className="hidden sm:flex disabled:cursor-not-allowed relative items-center justify-center rounded-full h-10 w-10 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-dashboard-accent"></span>
          </button>

          {/* User Profile */}
          <div
            className="flex items-center gap-2 md:gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/30 rounded-lg p-1.5 md:p-2 transition-colors"
            onClick={() => navigate('/dashboard/profile')}
          >
            <img
              alt="User avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgzlhPYlTgfHGbgfI0aOy6ZZm2pLt4SA0OwQLBiFl3HRoOXhL_hKp1Jw5H7e1XXSg9Zawje00OKMDhanKKzH7Bs-IFPmxTCouiLfq_L4qprsc2TbkG3xHayD9lTbiXh0L7IPJ6vLSgDv691avtCk3QhnsGZPkaQ_qTvmZHERdutmc4m1xh0sevaq47vnK1_CLgCaqL8ssL5X8LtKHYEddMFv5LyUFNIRTuKrE0gCQ1giS7wEYakc2iOhIRKfw2As5wuJoYvIuFyk6G"
              className="rounded-full size-8 md:size-10"
            />
            {/* User Info - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:block text-sm">
              <p className="text-dashboard-text-light dark:text-dashboard-text-dark font-medium">
                {user?.name || 'Olivia'}
              </p>
              <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-xs truncate max-w-[150px]">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile: Full-Screen Search Overlay */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark">
          {/* Search Header */}
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 p-4">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
              aria-label="Close search"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            
            <div className="flex-1 flex items-stretch rounded-lg h-10">
              <div className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark flex bg-dashboard-secondary dark:bg-dashboard-card-dark items-center justify-center pl-3 rounded-l-lg">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                type="text"
                placeholder="Search documents..."
                className="form-input flex-1 rounded-r-lg text-dashboard-text-light dark:text-dashboard-text-dark focus:outline-0 focus:ring-2 focus:ring-dashboard-primary/50 border-none bg-dashboard-secondary dark:bg-dashboard-card-dark h-full placeholder:text-dashboard-text-secondary-light dark:placeholder:text-dashboard-text-secondary-dark px-4 text-sm"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
            </div>

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                }}
                className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>

          {/* Search Results/Content Area */}
          <div className="p-4">
            {searchQuery ? (
              <div className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm">
                {/* Search results will appear here when user navigates */}
                Press enter or tap outside to search for "{searchQuery}"
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-4">
                  search
                </span>
                <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                  Search your documents
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;


// import { useLocation, useNavigate } from "react-router-dom";
// import { useDocumentStore } from "../../store/useDocumentStore";
// import { useUserStore } from "../../store/useUserStore";

// const Header: React.FC = () => {
// const {searchQuery, setSearchQuery} = useDocumentStore();
// const {user} = useUserStore()

// const navigate = useNavigate()
// const location = useLocation()


// const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const query = e.target.value;
//   setSearchQuery(query);
//   if (query && location.pathname !== '/dashboard/my-document') {
//     navigate('/dashboard/my-document')
//   }
// }
//   return (
//     <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-8 py-4">
//       <label className="flex flex-col min-w-40 w-1/3 max-w-lg">
//         <div className="flex w-full items-stretch rounded-lg h-10">
//           <div className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark flex bg-dashboard-secondary dark:bg-dashboard-card-dark items-center justify-center pl-3 rounded-l-lg">
//             <span className="material-symbols-outlined">search</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Search documents..."
//             className="form-input flex w-full rounded-r-lg text-dashboard-text-light dark:text-dashboard-text-dark focus:outline-0 focus:ring-2 focus:ring-dashboard-primary/50 border-none bg-dashboard-secondary dark:bg-dashboard-card-dark h-full placeholder:text-dashboard-text-secondary-light dark:placeholder:text-dashboard-text-secondary-dark px-4 text-sm"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//         </div>
//       </label>

//       <div className="flex items-center gap-4">
//         <button disabled className="disabled:cursor-not-allowed relative flex items-center justify-center rounded-full h-10 w-10 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700/50">
//           <span className="material-symbols-outlined">notifications</span>
//           <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-dashboard-accent"></span>
//         </button>

//         <div className="flex items-center gap-3"
//         onClick={() => navigate('/dashboard/profile') }>
//           <img
//             alt="User avatar"
//             src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgzlhPYlTgfHGbgfI0aOy6ZZm2pLt4SA0OwQLBiFl3HRoOXhL_hKp1Jw5H7e1XXSg9Zawje00OKMDhanKKzH7Bs-IFPmxTCouiLfq_L4qprsc2TbkG3xHayD9lTbiXh0L7IPJ6vLSgDv691avtCk3QhnsGZPkaQ_qTvmZHERdutmc4m1xh0sevaq47vnK1_CLgCaqL8ssL5X8LtKHYEddMFv5LyUFNIRTuKrE0gCQ1giS7wEYakc2iOhIRKfw2As5wuJoYvIuFyk6G"
//             className="rounded-full size-10"
//           />
//           <div className="text-sm">
//             <p className="text-dashboard-text-light dark:text-dashboard-text-dark font-medium">{user?.name || 'Olivia'}</p>
//             <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
//              {user?.email}
//             </p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;