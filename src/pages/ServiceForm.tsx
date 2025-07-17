import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Upload, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const ServiceForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Get serviceType from location state or URL params
  const { serviceType } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    urgency: "normal",
    message: ""
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceNames: Record<string, string> = {
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

  const serviceName = serviceNames[serviceType as keyof typeof serviceNames] || "Service";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a service request.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);

    try {
      // First, submit the service request
      const { error } = await supabase
        .from('service_requests')
        .insert({
          user_id: user.id,
          service_type: serviceType,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          urgency: formData.urgency,
          message: formData.message,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "Your service request has been submitted successfully.",
      });

      // Navigate to payment page
      navigate('/payment', { 
        state: { 
          serviceType, 
          formData, 
          uploadedFiles 
        } 
      });
    } catch (error) {
      console.error('Error submitting service request:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit service request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      toast({
        title: "Files Added",
        description: `${files.length} file(s) added successfully.`,
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (!serviceType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Invalid Service</h2>
            <p className="text-gray-600 mb-4">No service type selected. Please start from the services page.</p>
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
              {serviceName} - Service Request
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Information */}
            <div className="lg:col-span-1">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Service Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{serviceName}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Please fill out the form to get started with your {serviceName.toLowerCase()} service.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">What happens next?</h4>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>✓ Fill out the service request form</p>
                      <p>✓ Upload any required documents</p>
                      <p>✓ Proceed to payment</p>
                      <p>✓ Our team will contact you within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Service Request Form
                  </CardTitle>
                  <CardDescription>
                    Please provide your details for {serviceName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="rounded-lg border-2 focus:border-blue-400"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="rounded-lg border-2 focus:border-blue-400"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="rounded-lg border-2 focus:border-blue-400"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-medium">Company/Business Name</Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="rounded-lg border-2 focus:border-blue-400"
                          placeholder="Enter company name (optional)"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-sm font-medium">Service Urgency *</Label>
                      <select
                        id="urgency"
                        name="urgency"
                        required
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                      >
                        <option value="normal">Normal (10-15 days)</option>
                        <option value="urgent">Urgent (5-7 days)</option>
                        <option value="immediate">Immediate (2-3 days)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">Additional Requirements</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="rounded-lg border-2 focus:border-blue-400"
                        placeholder="Please describe any specific requirements or questions..."
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="documents" className="text-sm font-medium">Upload Documents (Optional)</Label>
                        <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                          <input
                            id="documents"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
                            className="hidden"
                          />
                          <label htmlFor="documents" className="cursor-pointer">
                            <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                            <p className="text-lg font-medium text-blue-700 mb-2">
                              Click to upload documents
                            </p>
                            <p className="text-sm text-gray-500">
                              Supported: PDF, DOC, DOCX, JPG, PNG, XLSX (Max 10MB each)
                            </p>
                          </label>
                        </div>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Uploaded Files:</Label>
                          <div className="space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <span className="text-sm font-medium">{file.name}</span>
                                  <span className="text-xs text-gray-500">
                                    ({(file.size / 1024).toFixed(2)} KB)
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                      <Badge variant="secondary" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Urgency: {formData.urgency}
                      </Badge>
                      <span className="text-sm text-blue-700">
                        {formData.urgency === 'immediate' && 'Express processing - 2-3 days'}
                        {formData.urgency === 'urgent' && 'Priority processing - 5-7 days'}
                        {formData.urgency === 'normal' && 'Standard processing - 10-15 days'}
                      </span>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300"
                    >
                      {isSubmitting ? 'Submitting...' : 'Proceed to Payment'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
