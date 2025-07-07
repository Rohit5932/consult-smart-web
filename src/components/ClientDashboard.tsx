
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  createdAt?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: "pending" | "processing" | "completed";
  uploadDate: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  clientName?: string;
}

const ClientDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    // Load appointments from localStorage
    const loadAppointments = () => {
      const stored = localStorage.getItem('appointments');
      let appointmentData: Appointment[] = [];
      
      if (stored) {
        appointmentData = JSON.parse(stored);
      } else {
        // Demo data
        appointmentData = [
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
        ];
      }
      setAppointments(appointmentData);
    };

    // Load documents from localStorage
    const loadDocuments = () => {
      const stored = localStorage.getItem('documents');
      let documentData: Document[] = [];
      
      if (stored) {
        documentData = JSON.parse(stored);
      } else {
        // Demo data
        documentData = [
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
        ];
      }
      setDocuments(documentData);
    };

    loadAppointments();
    loadDocuments();
    
    // Refresh every 5 seconds to show new submissions
    const interval = setInterval(() => {
      loadAppointments();
      loadDocuments();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

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
    return <Badge variant={variants[status] || "default"} className="text-xs">{status}</Badge>;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-blue-700">
              <Calendar className="h-4 w-4 md:h-5 md:w-5" />
              My Appointments
            </CardTitle>
            <CardDescription className="text-sm text-blue-600">Your scheduled and past appointments</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl gap-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(appointment.status)}
                    <div>
                      <div className="font-medium text-sm md:text-base">{appointment.service}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </div>
                      {appointment.name && (
                        <div className="text-xs text-gray-500">Client: {appointment.name}</div>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
              <Link to="/book-appointment">Book New Appointment</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-green-700">
              <FileText className="h-4 w-4 md:h-5 md:w-5" />
              My Documents
            </CardTitle>
            <CardDescription className="text-sm text-green-600">Track your document processing status</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {documents.map((document) => (
                <div key={document.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl gap-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(document.status)}
                    <div>
                      <div className="font-medium text-sm md:text-base">{document.fileName || document.name}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {document.type} • Uploaded {document.uploadDate}
                      </div>
                      {document.clientName && (
                        <div className="text-xs text-gray-500">Client: {document.clientName}</div>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(document.status)}
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" asChild>
              <Link to="/upload-documents">Upload Documents</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
          <CardTitle className="text-lg md:text-xl text-orange-700">Quick Actions</CardTitle>
          <CardDescription className="text-sm text-orange-600">Frequently used services</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Button 
              variant="outline" 
              className="h-20 md:h-24 flex flex-col text-xs md:text-sm rounded-xl border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/service-form/gst-filing">
                <FileText className="h-5 w-5 md:h-6 md:w-6 mb-2 text-blue-600" />
                GST Filing
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 md:h-24 flex flex-col text-xs md:text-sm rounded-xl border-2 hover:border-green-300 hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/service-form/itr-filing">
                <Calendar className="h-5 w-5 md:h-6 md:w-6 mb-2 text-green-600" />
                ITR Filing
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 md:h-24 flex flex-col text-xs md:text-sm rounded-xl border-2 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/service-form/tax-planning">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 mb-2 text-purple-600" />
                Tax Planning
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 md:h-24 flex flex-col text-xs md:text-sm rounded-xl border-2 hover:border-red-300 hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/service-form/compliance">
                <AlertCircle className="h-5 w-5 md:h-6 md:w-6 mb-2 text-red-600" />
                Compliance
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
