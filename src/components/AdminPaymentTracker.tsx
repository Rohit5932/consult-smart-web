
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download, User, Calendar, Eye, CheckCircle, XCircle } from "lucide-react";

interface PaymentRecord {
  id: string;
  serviceType: string;
  serviceName: string;
  clientData: any;
  paymentDetails: any;
  totalAmount: string;
  status: 'pending_verification' | 'verified' | 'rejected';
  createdAt: string;
  uploadedFiles: string[];
}

const AdminPaymentTracker = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);

  useEffect(() => {
    const loadPayments = () => {
      const stored = localStorage.getItem('paymentRecords');
      if (stored) {
        setPayments(JSON.parse(stored));
      }
    };

    loadPayments();
    const interval = setInterval(loadPayments, 5000);
    return () => clearInterval(interval);
  }, []);

  const updatePaymentStatus = (id: string, newStatus: 'pending_verification' | 'verified' | 'rejected') => {
    const updatedPayments = payments.map(payment => 
      payment.id === id ? { ...payment, status: newStatus } : payment
    );
    setPayments(updatedPayments);
    localStorage.setItem('paymentRecords', JSON.stringify(updatedPayments));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(payments, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payment_records_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending_verification: "secondary",
      verified: "default",
      rejected: "destructive"
    };
    const colors: Record<string, string> = {
      pending_verification: "text-yellow-600",
      verified: "text-green-600",
      rejected: "text-red-600"
    };
    return (
      <Badge variant={variants[status] || "secondary"} className={colors[status]}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Tracker
              </CardTitle>
              <CardDescription>Manage client payment submissions</CardDescription>
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
                <span>{payments.filter(p => p.status === 'pending_verification').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Verified</Badge>
                <span>{payments.filter(p => p.status === 'verified').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Rejected</Badge>
                <span>{payments.filter(p => p.status === 'rejected').length}</span>
              </div>
            </div>

            <div className="rounded-md border max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client & Service</TableHead>
                    <TableHead>Payment Details</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                        No payment records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-2 font-medium">
                              <User className="h-4 w-4" />
                              {payment.clientData.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {payment.serviceName}
                            </div>
                            <div className="text-xs text-gray-400">
                              {payment.clientData.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div><strong>Method:</strong> {payment.paymentDetails.paymentMethod || 'N/A'}</div>
                            <div><strong>TXN ID:</strong> {payment.paymentDetails.transactionId || 'N/A'}</div>
                            <div><strong>Payer:</strong> {payment.paymentDetails.payerName || 'N/A'}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-green-600">
                            {payment.totalAmount}
                          </div>
                          <div className="text-xs text-gray-500">
                            Paid: {payment.paymentDetails.paidAmount || 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(payment.createdAt).toLocaleTimeString()}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedPayment(payment)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {payment.status === 'pending_verification' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updatePaymentStatus(payment.id, 'verified')}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updatePaymentStatus(payment.id, 'rejected')}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
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

      {/* Payment Details Modal/Card */}
      {selectedPayment && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Payment Details - {selectedPayment.clientData.name}</CardTitle>
              <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Client Information</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Name:</strong> {selectedPayment.clientData.name}</p>
                  <p><strong>Email:</strong> {selectedPayment.clientData.email}</p>
                  <p><strong>Phone:</strong> {selectedPayment.clientData.phone}</p>
                  <p><strong>Company:</strong> {selectedPayment.clientData.company || 'N/A'}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Payment Information</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Method:</strong> {selectedPayment.paymentDetails.paymentMethod}</p>
                  <p><strong>Transaction ID:</strong> {selectedPayment.paymentDetails.transactionId}</p>
                  <p><strong>Payment Date:</strong> {selectedPayment.paymentDetails.paymentDate}</p>
                  <p><strong>Payment Time:</strong> {selectedPayment.paymentDetails.paymentTime}</p>
                  <p><strong>Payer Name:</strong> {selectedPayment.paymentDetails.payerName}</p>
                  <p><strong>Amount Paid:</strong> {selectedPayment.paymentDetails.paidAmount}</p>
                </div>
              </div>
            </div>
            
            {selectedPayment.paymentDetails.additionalNotes && (
              <div className="space-y-2">
                <h4 className="font-semibold">Additional Notes</h4>
                <p className="text-sm bg-gray-50 p-3 rounded-lg">
                  {selectedPayment.paymentDetails.additionalNotes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPaymentTracker;
