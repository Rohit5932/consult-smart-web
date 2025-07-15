
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Menu, X, User, LogOut, Shield } from "lucide-react";
import MobileNav from "./MobileNav";

const Navigation = () => {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              TaxConsult Pro
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/services"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/services") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Services
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/about") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/contact") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Contact
              </Link>
              <Link
                to="/blog"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/blog") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Blog
              </Link>
              <Link
                to="/updates"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/updates") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Updates
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/dashboard") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
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
                <div className="flex items-center space-x-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/user-dashboard">
                      <User className="w-4 h-4 mr-2" />
                      My Data
                    </Link>
                  </Button>
                  {profile?.role === 'admin' && (
                    <Button asChild variant="outline" size="sm">
                      <Link to="/admin">
                        <Shield className="w-4 h-4 mr-2" />
                        Admin
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );
};

export default Navigation;
