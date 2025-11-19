import { useLocation, useNavigate } from "react-router-dom";
import { useDocumentStore } from "../../store/useDocumentStore";

const Header: React.FC = () => {
const {searchQuery, setSearchQuery} = useDocumentStore()

const navigate = useNavigate()
const location = useLocation()

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const query = e.target.value;
  setSearchQuery(query);
  if (query && location.pathname !== '/dashboard/my-document') {
    navigate('/dashboard/my-document')
  }
}
  return (
    <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-8 py-4">
      <label className="flex flex-col min-w-40 w-1/3 max-w-lg">
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

      <div className="flex items-center gap-4">
        <button className="relative flex items-center justify-center rounded-full h-10 w-10 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700/50">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-dashboard-accent"></span>
        </button>

        <div className="flex items-center gap-3"
        onClick={() => navigate('/dashboard/profile') }>
          <img
            alt="User avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgzlhPYlTgfHGbgfI0aOy6ZZm2pLt4SA0OwQLBiFl3HRoOXhL_hKp1Jw5H7e1XXSg9Zawje00OKMDhanKKzH7Bs-IFPmxTCouiLfq_L4qprsc2TbkG3xHayD9lTbiXh0L7IPJ6vLSgDv691avtCk3QhnsGZPkaQ_qTvmZHERdutmc4m1xh0sevaq47vnK1_CLgCaqL8ssL5X8LtKHYEddMFv5LyUFNIRTuKrE0gCQ1giS7wEYakc2iOhIRKfw2As5wuJoYvIuFyk6G"
            className="rounded-full size-10"
          />
          <div className="text-sm">
            <p className="text-dashboard-text-light dark:text-dashboard-text-dark font-medium">Olivia Rhye</p>
            <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
              olivia@intellidoc.com
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;