import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, CheckCircle, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { serviceType, formData, uploadedFiles } = location.state || {};

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

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: "Your service request has been submitted and payment completed.",
      });
      
      setIsProcessing(false);
      navigate('/dashboard');
    }, 2000);
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
              onClick={() => navigate('/services')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Payment Checkout
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Service Summary */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Service Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{serviceName}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="text-2xl font-bold text-blue-600">{pricing?.price}</div>
                    <div className="text-lg text-gray-500 line-through">{pricing?.originalPrice}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Client Information:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Name:</span> {formData.name}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                    {formData.company && <p><span className="font-medium">Company:</span> {formData.company}</p>}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Service Details:</h4>
                  <Badge variant="secondary" className="flex items-center gap-2 w-fit">
                    <Clock className="h-4 w-4" />
                    Urgency: {formData.urgency}
                  </Badge>
                </div>

                {uploadedFiles && uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Uploaded Documents:</h4>
                    <div className="text-sm text-gray-600">
                      {uploadedFiles.map((file: File, index: number) => (
                        <p key={index}>• {file.name}</p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Payment Information
                </CardTitle>
                <CardDescription>
                  Secure payment processing for your service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Secure Payment</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your payment is processed securely using industry-standard encryption.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Service Fee:</span>
                    <span className="text-lg font-bold">{pricing?.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Processing Fee:</span>
                    <span className="text-sm text-blue-600">Included</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <span className="font-bold text-lg">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-600">{pricing?.price}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">What happens next?</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>✓ Your request will be assigned to our expert team</p>
                    <p>✓ We'll review your documents within 2 hours</p>
                    <p>✓ You'll receive regular updates on progress</p>
                    <p>✓ Get your service completed within the promised timeline</p>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
                >
                  {isProcessing ? "Processing..." : `Pay ${pricing?.price} Now`}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By proceeding with payment, you agree to our terms of service and privacy policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;