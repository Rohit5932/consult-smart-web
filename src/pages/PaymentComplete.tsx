import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, QrCode, Building2, User, Calendar, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const PaymentComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const { serviceType, formData, uploadedFiles, totalAmount } = location.state || {};
  
  const [paymentData, setPaymentData] = useState({
    paymentMethod: "",
    transactionId: "",
    paymentDate: "",
    paymentTime: "",
    paidAmount: "",
    payerName: "",
    payerEmail: "",
    payerPhone: "",
    paymentScreenshot: null as File | null,
    additionalNotes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bank details - you can customize these
  const bankDetails = {
    bankName: "State Bank of India",
    accountName: "Your Business Name",
    accountNumber: "1234567890123",
    ifscCode: "SBIN0001234",
    branchName: "Main Branch",
    upiId: "yourbusiness@paytm"
  };

  const servicePricing = {
    "gst-registration": { price: "₹2,999", originalPrice: "₹4,999" },
    "gst-filing": { price: "₹999/month", originalPrice: "₹1,499/month" },
    "itr-filing": { price: "₹1,499", originalPrice: "₹2,499" },
    "company-registration": { price: "₹8,999", originalPrice: "₹12,999" },
    "business-license": { price: "₹2,499", originalPrice: "₹3,999" },
    "accounting-services": { price: "₹4,999/month", originalPrice: "₹6,999/month" },
    "tax-planning": { price: "₹5,999", originalPrice: "₹8,999" },
    "audit-services": { price: "₹15,999", originalPrice: "₹22,999" },
    "compliance": { price: "₹1,999/quarter", originalPrice: "₹2,999/quarter" }
  };

  const serviceNames = {
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

  const pricing = servicePricing[serviceType as keyof typeof servicePricing];
  const serviceName = serviceNames[serviceType as keyof typeof serviceNames];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPaymentData({
      ...paymentData,
      paymentScreenshot: file
    });
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit payment details.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('payment_records')
        .insert({
          user_id: user.id,
          service_type: serviceType,
          service_name: serviceName,
          client_data: formData,
          payment_details: paymentData,
          total_amount: pricing?.price || totalAmount,
          status: 'pending_verification',
          uploaded_files: uploadedFiles?.map((file: File) => file.name) || []
        });

      if (error) throw error;

      toast({
        title: "Payment Submitted Successfully!",
        description: "Your payment details have been submitted. We'll verify and confirm within 24 hours.",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit payment details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!serviceType || !formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Invalid Payment Request</h2>
            <p className="text-gray-600 mb-4">No service data found. Please start from the services page.</p>
            <Button onClick={() => navigate('/services')}>Back to Services</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Complete Your Payment
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Summary */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-6 w-6" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{serviceName}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="text-2xl font-bold text-blue-600">{pricing?.price}</div>
                    <div className="text-lg text-gray-500 line-through">{pricing?.originalPrice}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Client Information:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Name:</span> {formData.name}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      Total Amount
                    </div>
                    <div className="text-3xl font-bold text-green-800">
                      {pricing?.price}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-6 w-6" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Choose any method to pay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code Section */}
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border">
                  <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="h-24 w-24 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">QR Code</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Scan to Pay</p>
                  <p className="text-xs text-gray-500">Use any UPI app to scan and pay</p>
                </div>

                {/* Bank Details */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Bank Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Name:</span>
                      <span className="font-medium">{bankDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Name:</span>
                      <span className="font-medium">{bankDetails.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-medium">{bankDetails.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">IFSC Code:</span>
                      <span className="font-medium">{bankDetails.ifscCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">UPI ID:</span>
                      <span className="font-medium text-blue-600">{bankDetails.upiId}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-800">
                    <strong>Note:</strong> After making the payment, please fill the form on the right to confirm your payment details.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Confirmation Form */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Payment Confirmation
                </CardTitle>
                <CardDescription>Submit your payment details for verification</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPayment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method *</Label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={paymentData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                      required
                    >
                      <option value="">Select Payment Method</option>
                      <option value="upi">UPI Transfer</option>
                      <option value="bank-transfer">Bank Transfer</option>
                      <option value="net-banking">Net Banking</option>
                      <option value="card">Credit/Debit Card</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transactionId">Transaction ID *</Label>
                      <Input
                        id="transactionId"
                        name="transactionId"
                        value={paymentData.transactionId}
                        onChange={handleInputChange}
                        placeholder="Enter transaction ID"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paidAmount">Amount Paid *</Label>
                      <Input
                        id="paidAmount"
                        name="paidAmount"
                        value={paymentData.paidAmount}
                        onChange={handleInputChange}
                        placeholder="Enter amount paid"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentDate">Payment Date *</Label>
                      <Input
                        id="paymentDate"
                        name="paymentDate"
                        type="date"
                        value={paymentData.paymentDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentTime">Payment Time *</Label>
                      <Input
                        id="paymentTime"
                        name="paymentTime"
                        type="time"
                        value={paymentData.paymentTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payerName">Payer Name *</Label>
                    <Input
                      id="payerName"
                      name="payerName"
                      value={paymentData.payerName}
                      onChange={handleInputChange}
                      placeholder="Enter payer name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="payerEmail">Payer Email</Label>
                      <Input
                        id="payerEmail"
                        name="payerEmail"
                        type="email"
                        value={paymentData.payerEmail}
                        onChange={handleInputChange}
                        placeholder="Enter payer email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payerPhone">Payer Phone</Label>
                      <Input
                        id="payerPhone"
                        name="payerPhone"
                        type="tel"
                        value={paymentData.payerPhone}
                        onChange={handleInputChange}
                        placeholder="Enter payer phone"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentScreenshot">Payment Screenshot</Label>
                    <Input
                      id="paymentScreenshot"
                      name="paymentScreenshot"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500">Upload payment receipt or screenshot</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={paymentData.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Any additional information about the payment"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Payment Details'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Your payment will be verified within 24 hours and you'll receive a confirmation email.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComplete;
