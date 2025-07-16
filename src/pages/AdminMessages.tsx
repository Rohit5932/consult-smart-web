
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const AdminMessages = () => {
  const [messages] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      message: "Need help with GST registration for my new business",
      date: "2024-03-15",
      status: "New"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 9876543211",
      message: "Want to schedule consultation for ITR filing",
      date: "2024-03-14",
      status: "Responded"
    }
  ]);

  const [appointments] = useState([
    {
      id: 1,
      name: "Ram Kumar",
      email: "ram@example.com",
      service: "GST Filing",
      date: "2024-03-20",
      time: "10:00 AM",
      status: "Confirmed"
    },
    {
      id: 2,
      name: "Sita Patel",
      email: "sita@example.com",
      service: "Business Registration",
      date: "2024-03-21",
      time: "2:00 PM",
      status: "Pending"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin - Messages & Appointments</h1>
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="hover:text-primary">Dashboard</Link>
              <Link to="/" className="hover:text-primary">Back to Site</Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Client Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💬 Client Messages
                <Badge variant="secondary">{messages.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">{message.name}</TableCell>
                      <TableCell>{message.email}</TableCell>
                      <TableCell>{message.phone}</TableCell>
                      <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>
                        <Badge variant={message.status === "New" ? "default" : "secondary"}>
                          {message.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Reply</Button>
                          <Button size="sm" variant="outline">Mark Read</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Appointment Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📅 Appointment Requests
                <Badge variant="secondary">{appointments.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.name}</TableCell>
                      <TableCell>{appointment.email}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Confirm</Button>
                          <Button size="sm" variant="outline">Reschedule</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
