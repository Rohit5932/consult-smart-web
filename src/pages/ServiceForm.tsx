
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FileText, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ServiceForm = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    urgency: "normal"
  });

  const serviceConfig = {
    "gst-filing": {
      title: "GST Filing Service",
      icon: FileText,
      description: "Get professional help with your GST return filing",
      color: "blue"
    },
    "itr-filing": {
      title: "ITR Filing Service", 
      icon: Calendar,
      description: "Professional income tax return filing assistance",
      color: "green"
    },
    "tax-planning": {
      title: "Tax Planning Service",
      icon: CheckCircle,
      description: "Strategic tax planning to minimize your tax liability",
      color: "purple"
    },
    "compliance": {
      title: "Compliance Service",
      icon: AlertCircle,
      description: "Ensure your business stays compliant with all regulations",
      color: "red"
    }
  };

  const service = serviceConfig[serviceType as keyof typeof serviceConfig];
  const IconComponent = service?.icon || FileText;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage (simulating backend)
    const existingRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    const newRequest = {
      id: Date.now().toString(),
      serviceType,
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    existingRequests.push(newRequest);
    localStorage.setItem('serviceRequests', JSON.stringify(existingRequests));
    
    toast({
      title: "Request Submitted!",
      description: "We'll contact you within 24 hours.",
    });
    
    navigate('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Service Not Found</h2>
            <p className="text-gray-600 mb-4">The requested service could not be found.</p>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
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
              onClick={() => navigate('/dashboard')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              {service.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className={`bg-gradient-to-r from-${service.color}-50 to-${service.color}-100 rounded-t-lg`}>
              <CardTitle className={`flex items-center gap-3 text-2xl text-${service.color}-700`}>
                <IconComponent className="h-8 w-8" />
                {service.title}
              </CardTitle>
              <CardDescription className={`text-${service.color}-600 text-base`}>
                {service.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
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
                    <Label htmlFor="company" className="text-sm font-medium">Company Name</Label>
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
                  <Label htmlFor="urgency" className="text-sm font-medium">Urgency Level</Label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  >
                    <option value="normal">Normal (7-10 days)</option>
                    <option value="urgent">Urgent (3-5 days)</option>
                    <option value="immediate">Immediate (1-2 days)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">Additional Details</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="rounded-lg border-2 focus:border-blue-400"
                    placeholder="Please provide any additional details about your requirements..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className={`w-full py-6 text-lg rounded-full bg-gradient-to-r from-${service.color}-600 to-${service.color}-700 hover:from-${service.color}-700 hover:to-${service.color}-800 transform hover:scale-105 transition-all duration-300`}
                >
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
