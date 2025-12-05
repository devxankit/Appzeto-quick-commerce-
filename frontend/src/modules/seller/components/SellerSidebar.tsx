import { useNavigate, useLocation } from 'react-router-dom';

interface MenuItem {
  label: string;
  path: string;
  hasSubmenu?: boolean;
}

interface SellerSidebarProps {
  onClose?: () => void;
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', path: '/seller' },
  { label: 'Orders', path: '/seller/orders' },
  { label: 'POS Orders', path: '/seller/pos-orders' },
  { label: 'Category', path: '/seller/category' },
  { label: 'SubCategory', path: '/seller/subcategory' },
  { label: 'Product', path: '/seller/product', hasSubmenu: true },
  { label: 'Wallet Transaction', path: '/seller/wallet-transaction' },
  { label: 'Withdrawl request', path: '/seller/withdrawal-request' },
  { label: 'Reports', path: '/seller/reports', hasSubmenu: true },
  { label: 'Return', path: '/seller/return' },
];

export default function SellerSidebar({ onClose }: SellerSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/seller') {
      return location.pathname === '/seller' || location.pathname === '/seller/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside className="w-64 bg-teal-700 h-screen flex flex-col">
      {/* Close button - only show on mobile */}
      <div className="flex justify-end p-4 border-b border-teal-600 lg:hidden">
        <button
          onClick={onClose}
          className="p-2 text-teal-100 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <nav className="flex-1 py-4 sm:py-6 overflow-y-auto">
        <ul className="space-y-1 px-2 sm:px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-colors ${
                  isActive(item.path)
                    ? 'bg-teal-600 text-white'
                    : 'text-teal-100 hover:bg-teal-600/50 hover:text-white'
                }`}
              >
                <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                {item.hasSubmenu && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={isActive(item.path) ? 'text-white' : 'text-teal-200'}
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

