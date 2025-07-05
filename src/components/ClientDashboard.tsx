
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: "pending" | "processing" | "completed";
  uploadDate: string;
}

const ClientDashboard = () => {
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      service: "GST Filing",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "completed"
    },
    {
      id: "2",
      service: "Income Tax Return",
      date: "2024-01-20",
      time: "2:00 PM",
      status: "scheduled"
    }
  ]);

  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Form 16.pdf",
      type: "Income Tax",
      status: "completed",
      uploadDate: "2024-01-10"
    },
    {
      id: "2",
      name: "GST Returns.xlsx",
      type: "GST",
      status: "processing",
      uploadDate: "2024-01-12"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing":
      case "scheduled":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      completed: "default",
      scheduled: "secondary",
      processing: "secondary",
      cancelled: "destructive",
      pending: "secondary"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              My Appointments
            </CardTitle>
            <CardDescription>Your scheduled and past appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(appointment.status)}
                    <div>
                      <div className="font-medium">{appointment.service}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Book New Appointment
            </Button>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              My Documents
            </CardTitle>
            <CardDescription>Track your document processing status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(document.status)}
                    <div>
                      <div className="font-medium">{document.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {document.type} • Uploaded {document.uploadDate}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(document.status)}
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Upload Documents
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col">
              <FileText className="h-6 w-6 mb-2" />
              GST Filing
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              ITR Filing
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <CheckCircle className="h-6 w-6 mb-2" />
              Tax Planning
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <AlertCircle className="h-6 w-6 mb-2" />
              Compliance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
