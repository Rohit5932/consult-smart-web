
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FileText, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadDocuments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    documentType: "",
    description: ""
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const documentTypes = [
    "Income Tax Documents",
    "GST Returns",
    "Financial Statements",
    "Bank Statements",
    "Investment Documents",
    "Business Registration",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save to localStorage
    const existingDocuments = JSON.parse(localStorage.getItem('documents') || '[]');
    const newDocument = {
      id: Date.now().toString(),
      fileName: selectedFile.name,
      fileSize: (selectedFile.size / 1024).toFixed(2) + ' KB',
      fileType: selectedFile.type || 'application/octet-stream',
      ...formData,
      status: 'pending',
      uploadDate: new Date().toISOString()
    };
    
    existingDocuments.push(newDocument);
    localStorage.setItem('documents', JSON.stringify(existingDocuments));
    
    setUploading(false);
    
    toast({
      title: "Document Uploaded!",
      description: "Your document has been uploaded successfully.",
    });
    
    navigate('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Upload Documents
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl text-green-700">
                <FileText className="h-8 w-8" />
                Upload Your Documents
              </CardTitle>
              <CardDescription className="text-green-600 text-base">
                Securely upload your documents for processing
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="clientName" className="text-sm font-medium">Full Name *</Label>
                    <Input
                      id="clientName"
                      name="clientName"
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={handleInputChange}
                      className="rounded-lg border-2 focus:border-green-400"
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
                      className="rounded-lg border-2 focus:border-green-400"
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
                      className="rounded-lg border-2 focus:border-green-400"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="documentType" className="text-sm font-medium">Document Type *</Label>
                    <select
                      id="documentType"
                      name="documentType"
                      required
                      value={formData.documentType}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border-2 focus:border-green-400 bg-white"
                    >
                      <option value="">Select document type</option>
                      {documentTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="rounded-lg border-2 focus:border-green-400"
                    placeholder="Brief description of the document"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file" className="text-sm font-medium">Select File *</Label>
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                    <input
                      id="file"
                      type="file"
                      required
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
                      className="hidden"
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-lg font-medium text-green-700 mb-2">
                        {selectedFile ? selectedFile.name : "Click to select file"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Supported: PDF, DOC, DOCX, JPG, PNG, XLSX (Max 10MB)
                      </p>
                      {selectedFile && (
                        <div className="mt-2 flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span>File selected: {(selectedFile.size / 1024).toFixed(2)} KB</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={uploading}
                  className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Document
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
