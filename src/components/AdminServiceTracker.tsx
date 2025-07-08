
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, User, Clock } from "lucide-react";

interface ServiceRequest {
  id: string;
  serviceType: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  urgency: string;
  message: string;
  status: "pending" | "processing" | "completed";
  createdAt: string;
}

const AdminServiceTracker = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    const loadRequests = () => {
      const stored = localStorage.getItem('serviceRequests');
      if (stored) {
        setRequests(JSON.parse(stored));
      }
    };

    loadRequests();
    const interval = setInterval(loadRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = (id: string, newStatus: "pending" | "processing" | "completed") => {
    const updatedRequests = requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('serviceRequests', JSON.stringify(updatedRequests));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(requests, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `service_requests_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      processing: "default",
      completed: "default"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const getUrgencyBadge = (urgency: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      normal: "secondary",
      urgent: "default",
      immediate: "destructive"
    };
    return <Badge variant={variants[urgency] || "secondary"}>{urgency}</Badge>;
  };

  const serviceTypeNames: Record<string, string> = {
    "gst-registration": "GST Registration",
    "gst-filing": "GST Filing",
    "itr-filing": "ITR Filing",
    "company-registration": "Company Registration",
    "business-license": "Business License",
    "accounting-services": "Accounting Services",
    "tax-planning": "Tax Planning",
    "audit-services": "Audit Services",
    "compliance": "TDS Compliance"
  };

  const getDeadline = (request: ServiceRequest) => {
    const createdDate = new Date(request.createdAt);
    const urgencyDays = {
      'immediate': 2,
      'urgent': 5,
      'normal': 10
    };
    const days = urgencyDays[request.urgency as keyof typeof urgencyDays] || 10;
    createdDate.setDate(createdDate.getDate() + days);
    return createdDate;
  };

  const isOverdue = (request: ServiceRequest) => {
    if (request.status === 'completed') return false;
    return new Date() > getDeadline(request);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Service Requests
            </CardTitle>
            <CardDescription>Manage client service requests</CardDescription>
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
              <Badge variant="secondary">Pending</Badge>
              <span>{requests.filter(r => r.status === 'pending').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">Processing</Badge>
              <span>{requests.filter(r => r.status === 'processing').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">Completed</Badge>
              <span>{requests.filter(r => r.status === 'completed').length}</span>
            </div>
          </div>

          <div className="rounded-md border max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client & Service</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                      No service requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-2 font-medium">
                            <User className="h-4 w-4" />
                            {request.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {serviceTypeNames[request.serviceType] || request.serviceType}
                          </div>
                          {request.company && (
                            <div className="text-xs text-gray-400">{request.company}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{request.email}</div>
                          <div className="text-gray-500">{request.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getUrgencyBadge(request.urgency)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(request.id, 'processing')}
                            disabled={request.status !== 'pending'}
                          >
                            Process
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(request.id, 'completed')}
                            disabled={request.status === 'completed'}
                          >
                            Complete
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

export default AdminServiceTracker;
