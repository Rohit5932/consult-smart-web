
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Calendar, 
  CreditCard, 
  Upload, 
  Settings, 
  User,
  Shield,
  BarChart3 
} from "lucide-react";
import Navigation from "@/components/Navigation";
import AdminPromotion from "@/components/AdminPromotion";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();

  console.log('Dashboard - user:', user?.id, 'profile:', profile, 'loading:', loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <Card>
          <CardContent className="pt-6">
            <p>Please sign in to access your dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <Card className="bg-gradient-to-r from-blue-500 to-orange-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">
                Welcome back, {profile?.full_name || 'User'}!
              </CardTitle>
              <CardDescription className="text-blue-100">
                Manage your tax services and track your progress from your dashboard.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Admin Promotion Card (only for non-admin users) */}
          <AdminPromotion />

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service Request */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">Request Service</CardTitle>
                    <CardDescription>Start a new tax service request</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/services">Browse Services</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Book Appointment */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <div>
                    <CardTitle className="text-lg">Book Appointment</CardTitle>
                    <CardDescription>Schedule a consultation</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/book-appointment">Schedule Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upload Documents */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Upload className="h-8 w-8 text-orange-600" />
                  <div>
                    <CardTitle className="text-lg">Upload Documents</CardTitle>
                    <CardDescription>Share your tax documents securely</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/upload-documents">Upload Files</Link>
                </Button>
              </CardContent>
            </Card>

            {/* My Data */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <User className="h-8 w-8 text-purple-600" />
                  <div>
                    <CardTitle className="text-lg">My Data</CardTitle>
                    <CardDescription>View your submissions and history</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/user-dashboard">View Data</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-red-600" />
                  <div>
                    <CardTitle className="text-lg">Make Payment</CardTitle>
                    <CardDescription>Pay for your services</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/payment">Pay Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Admin Panel (only for admins) */}
            {profile?.role === 'admin' && (
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-orange-200 bg-orange-50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-orange-600" />
                    <div>
                      <CardTitle className="text-lg text-orange-800">Admin Panel</CardTitle>
                      <CardDescription className="text-orange-700">Manage users and services</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                    <Link to="/admin">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions with our services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent activity to display.</p>
                <p className="text-sm">Start by requesting a service or booking an appointment.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
