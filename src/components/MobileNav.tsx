
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { User, LogOut, Shield } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const { user, profile, signOut } = useAuth();

  if (!isOpen) return null;

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
        <Link
          to="/"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          to="/services"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={onClose}
        >
          Services
        </Link>
        <Link
          to="/about"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={onClose}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={onClose}
        >
          Contact
        </Link>
        <Link
          to="/blog"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={onClose}
        >
          Blog
        </Link>
        <Link
          to="/updates"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={onClose}
        >
          Updates
        </Link>
        {user && (
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={onClose}
          >
            Dashboard
          </Link>
        )}

        {/* Auth Section */}
        <div className="pt-4 border-t">
          {user ? (
            <div className="space-y-3">
              <div className="px-3 py-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">
                    <User className="w-3 h-3 mr-1" />
                    {profile?.full_name || user.email}
                  </Badge>
                  {profile?.role === 'admin' && (
                    <Badge variant="destructive">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
              <Link
                to="/user-dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={onClose}
              >
                <User className="w-4 h-4 mr-2 inline" />
                My Data
              </Link>
              {profile?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={onClose}
                >
                  <Shield className="w-4 h-4 mr-2 inline" />
                  Admin Panel
                </Link>
              )}
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="px-3 py-2">
              <Button asChild className="w-full">
                <Link to="/auth" onClick={onClose}>
                  Sign In
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
