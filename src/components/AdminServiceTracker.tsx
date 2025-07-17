import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, User, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ServiceRequest {
  id: string;
  service_type: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  urgency: string;
  message?: string;
  status: "pending" | "processing" | "completed";
  created_at: string;
}

const AdminServiceTracker = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadRequests();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('service-requests-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'service_requests'
      }, () => {
        loadRequests();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type cast the data to ensure proper types
      const typedData: ServiceRequest[] = (data || []).map(item => ({
        id: item.id,
        service_type: item.service_type,
        name: item.name,
        email: item.email,
        phone: item.phone,
        company: item.company || undefined,
        urgency: item.urgency || 'normal',
        message: item.message || undefined,
        status: (item.status || 'pending') as "pending" | "processing" | "completed",
        created_at: item.created_at
      }));
      
      setRequests(typedData);
    } catch (error) {
      console.error('Error loading service requests:', error);
      toast({
        title: "Error",
        description: "Failed to load service requests",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: "pending" | "processing" | "completed") => {
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Service request status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update service request status",
        variant: "destructive"
      });
    }
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
    "compliance": "TDS Compliance",
    "msme-registration": "MSME Registration",
    "digital-signature": "Digital Signature",
    "firm-registration": "Firm Registration",
    "loan-precheck": "Loan Pre-check"
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Loading service requests...</p>
        </CardContent>
      </Card>
    );
  }

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
                            {serviceTypeNames[request.service_type] || request.service_type}
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
                          {new Date(request.created_at).toLocaleDateString()}
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
