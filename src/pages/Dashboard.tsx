
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, FileText, Calendar, Upload, CreditCard, Settings } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut, user, profile, loading } = useAuth();

  console.log('Dashboard - user:', user?.id, 'profile:', profile, 'loading:', loading);

  useEffect(() => {
    if (!loading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render anything if no user (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              TaxConsult Pro Dashboard
            </h1>
            <div className="flex items-center space-x-2">
              {profile?.role === 'admin' && (
                <Button variant="outline" onClick={() => navigate('/admin')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              )}
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Message */}
          <Card className="bg-gradient-to-r from-blue-500 to-orange-500 text-white">
            <CardHeader>
              <CardTitle>Welcome, {profile?.full_name || user.email}</CardTitle>
              <CardDescription className="text-blue-100">
                Manage your tax and business consulting needs from your dashboard
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/service-form')}>
              <CardHeader className="text-center">
                <FileText className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-lg">Request Service</CardTitle>
                <CardDescription>Submit a new service request</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/book-appointment')}>
              <CardHeader className="text-center">
                <Calendar className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-lg">Book Appointment</CardTitle>
                <CardDescription>Schedule a consultation</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/upload-documents')}>
              <CardHeader className="text-center">
                <Upload className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <CardTitle className="text-lg">Upload Documents</CardTitle>
                <CardDescription>Share required documents</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/payment')}>
              <CardHeader className="text-center">
                <CreditCard className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <CardTitle className="text-lg">Make Payment</CardTitle>
                <CardDescription>Complete your payment</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Services Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Our Services</CardTitle>
              <CardDescription>Explore our comprehensive range of tax and business services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-blue-600">Tax Services</h3>
                    <p className="text-sm text-muted-foreground">ITR Filing, GST Registration & Filing, Tax Planning</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-green-600">Business Services</h3>
                    <p className="text-sm text-muted-foreground">Company Registration, Business Licenses, Compliance</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-orange-600">Consultation</h3>
                    <p className="text-sm text-muted-foreground">Expert advice on tax and business matters</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-purple-600">Documentation</h3>
                    <p className="text-sm text-muted-foreground">Document preparation and verification</p>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/services')}
                >
                  View All Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
