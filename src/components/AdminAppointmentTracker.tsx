
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Phone, Mail, User, Download } from "lucide-react";

interface AppointmentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt: string;
}

const AdminAppointmentTracker = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  useEffect(() => {
    // Load appointments from localStorage
    const loadAppointments = () => {
      const stored = localStorage.getItem('appointments');
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    };

    loadAppointments();
    // Refresh every 5 seconds to simulate real-time updates
    const interval = setInterval(loadAppointments, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = (id: string, newStatus: "scheduled" | "completed" | "cancelled") => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(appointments, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointments_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      scheduled: "secondary",
      completed: "default",
      cancelled: "destructive"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointment Tracker
            </CardTitle>
            <CardDescription>Manage all client appointments</CardDescription>
          </div>
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Scheduled</Badge>
              <span>{appointments.filter(a => a.status === 'scheduled').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">Completed</Badge>
              <span>{appointments.filter(a => a.status === 'completed').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="destructive">Cancelled</Badge>
              <span>{appointments.filter(a => a.status === 'cancelled').length}</span>
            </div>
          </div>

          <div className="rounded-md border max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                      No appointments found
                    </TableCell>
                  </TableRow>
                ) : (
                  appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-2 font-medium">
                            <User className="h-4 w-4" />
                            {appointment.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {appointment.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {appointment.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          {appointment.time}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(appointment.id, 'completed')}
                            disabled={appointment.status === 'completed'}
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(appointment.id, 'cancelled')}
                            disabled={appointment.status === 'cancelled'}
                          >
                            Cancel
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAppointmentTracker;
