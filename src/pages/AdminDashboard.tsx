
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AdminAppointmentTracker from "@/components/AdminAppointmentTracker";
import AdminDocumentTracker from "@/components/AdminDocumentTracker";
import CountdownTimer from "@/components/CountdownTimer";

const AdminDashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TaxConsult Pro - Admin</h1>
            <div className="flex items-center space-x-4">
              <Link to="/" className="hover:text-primary">Back to Site</Link>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button>Sign In</Button>
                </SignInButton>
              </SignedOut>
            </div>
          </nav>
        </div>
      </header>

      <SignedOut>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Admin Access Required</h2>
          <p className="text-muted-foreground mb-8">Please sign in to access the admin panel</p>
          <SignInButton>
            <Button size="lg">Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
          
          {/* Quick Actions Panel */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="text-3xl mb-2">🛠️</div>
                <CardTitle>Manage Services</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Add, edit, or remove services</CardDescription>
                <Button className="mt-4 w-full" asChild>
                  <Link to="/admin/services">Manage Services</Link>
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
                <div className="text-3xl mb-2">📢</div>
                <CardTitle>Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Manage news and updates</CardDescription>
                <Button className="mt-4 w-full" asChild>
                  <Link to="/admin/updates">Manage Updates</Link>
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
            <AdminAppointmentTracker />
            <AdminDocumentTracker />
          </div>
        </div>
      </SignedIn>
    </div>
  );
};

export default AdminDashboard;
