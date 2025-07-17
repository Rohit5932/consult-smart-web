import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shell } from "@/components/Shell";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import AdminServiceTracker from "@/components/AdminServiceTracker";
import AdminDocumentTracker from "@/components/AdminDocumentTracker";
import AdminPaymentTracker from "@/components/AdminPaymentTracker";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [serviceRequestCount, setServiceRequestCount] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);

  useEffect(() => {
    // Load user count
    const storedUsers = localStorage.getItem('users');
    setUserCount(storedUsers ? JSON.parse(storedUsers).length : 0);

    // Load service request count
    const storedServiceRequests = localStorage.getItem('serviceRequests');
    setServiceRequestCount(storedServiceRequests ? JSON.parse(storedServiceRequests).length : 0);

    // Load document count
    const storedDocuments = localStorage.getItem('documents');
    setDocumentCount(storedDocuments ? JSON.parse(storedDocuments).length : 0);

    // Load payment count
    const storedPayments = localStorage.getItem('paymentRecords');
    setPaymentCount(storedPayments ? JSON.parse(storedPayments).length : 0);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-blue-50 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Total Users</CardTitle>
                <CardDescription>Registered users on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-700">{userCount}</div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Service Requests</CardTitle>
                <CardDescription>New service requests received</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700">{serviceRequestCount}</div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Documents Uploaded</CardTitle>
                <CardDescription>Total documents uploaded by clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-700">{documentCount}</div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Payments Received</CardTitle>
                <CardDescription>Total payments submitted by clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-700">{paymentCount}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="services" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="services">Service Requests</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-6">
              <AdminServiceTracker />
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <AdminDocumentTracker />
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <AdminPaymentTracker />
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              {/* Users Management */}
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage registered users and their roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {user ? (
                        <TableRow key={user.uid}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar>
                                <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.email} />
                                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span>{user.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Admin</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            No users found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
