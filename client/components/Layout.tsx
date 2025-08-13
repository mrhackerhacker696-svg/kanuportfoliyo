import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SMSNotifications from "./SMSNotifications";
import {
  LayoutDashboard,
  Target,
  FolderOpen,
  Activity,
  Github,
  Settings,
  User,
  Search,
  Bell,
  LogOut,
  MessageCircle,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Skills", href: "/skills", icon: Target },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Activities", href: "/activities", icon: Activity },
    { name: "Messages", href: "/contact", icon: MessageCircle },
    { name: "SMS Alerts", href: "/sms-management", icon: Bell },
    { name: "Git Integration", href: "/git-integration", icon: Github },
    { name: "Admin Settings", href: "/admin-settings", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">⚡ logo</div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-500">
          Made with ⚡ Visily
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Navigation tabs */}
            <nav className="flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* SMS Notifications */}
              <SMSNotifications />

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-green-700" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
