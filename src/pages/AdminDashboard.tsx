
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Users, Database, Settings, LogOut } from "lucide-react";
import AdminAppointmentTracker from "@/components/AdminAppointmentTracker";
import AdminDocumentTracker from "@/components/AdminDocumentTracker";
import AdminServiceTracker from "@/components/AdminServiceTracker";
import CountdownTimer from "@/components/CountdownTimer";

const AdminDashboard = () => {
  const { user, profile, signOut } = useAuth();

  console.log('AdminDashboard - User:', user?.id, 'Profile:', profile);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TaxConsult Pro - Admin</h1>
            <div className="flex items-center space-x-4">
              <Link to="/" className="hover:text-primary">Back to Site</Link>
              <span className="text-sm text-muted-foreground">
                {profile?.full_name || user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
        
        {/* Quick Actions Panel */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="text-3xl mb-2">👥</div>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Manage users and permissions</CardDescription>
              <Button className="mt-4 w-full" asChild>
                <Link to="/admin/panel">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="text-3xl mb-2">🛠️</div>
              <CardTitle>Manage Services</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Add, edit, or remove services</CardDescription>
              <Button className="mt-4 w-full" asChild>
                <Link to="/admin/services">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Services
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="text-3xl mb-2">📝</div>
              <CardTitle>Blog Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Create and edit blog posts</CardDescription>
              <Button className="mt-4 w-full" asChild>
                <Link to="/admin/blog">Manage Blog</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="text-3xl mb-2">💬</div>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>View client messages and appointments</CardDescription>
              <Button className="mt-4 w-full" asChild>
                <Link to="/admin/messages">View Messages</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Countdown Timers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <CountdownTimer 
            title="GST Filing Deadline"
            description="Next GST return filing deadline"
            endDate="2024-02-20T23:59:59"
          />
          <CountdownTimer 
            title="ITR Filing Season"
            description="Income Tax Return filing deadline"
            endDate="2024-07-31T23:59:59"
          />
          <CountdownTimer 
            title="Special Offer"
            description="Limited time discount on all services"
            endDate="2024-01-31T23:59:59"
          />
        </div>

        {/* Data Management */}
        <div className="space-y-8">
          <AdminServiceTracker />
          <AdminAppointmentTracker />
          <AdminDocumentTracker />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
