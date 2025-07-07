
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, CheckCircle, AlertCircle } from "lucide-react";

interface UploadedDocument {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  status: "pending" | "processing" | "completed";
  uploadDate: string;
  clientName: string;
}

const DocumentUpload = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [clientName, setClientName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedDocument[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !clientName) {
      toast({
        title: "Error",
        description: "Please enter your name and select files to upload.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    // Simulate upload process
    for (const file of Array.from(files)) {
      // Validate file type
      if (!file.type.includes('pdf') && !file.type.includes('image')) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a supported file type. Please upload PDF or image files.`,
          variant: "destructive"
        });
        continue;
      }

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const uploadedDoc: UploadedDocument = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        fileType: file.type,
        status: "pending",
        uploadDate: new Date().toISOString(),
        clientName: clientName
      };

      setUploadedFiles(prev => [...prev, uploadedDoc]);

      // Store in localStorage (simulating database)
      const existingDocs = JSON.parse(localStorage.getItem('documents') || '[]');
      existingDocs.push(uploadedDoc);
      localStorage.setItem('documents', JSON.stringify(existingDocs));
    }

    setUploading(false);
    toast({
      title: "Upload Successful!",
      description: `${files.length} file(s) uploaded successfully.`,
    });

    // Reset form
    setClientName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Upload className="h-6 w-6 text-blue-600" />
            Document Upload
          </CardTitle>
          <CardDescription>Upload your tax documents securely</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="clientName">Your Name *</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="documents">Select Documents *</Label>
            <Input
              id="documents"
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              className="mt-1"
              disabled={uploading || !clientName}
            />
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: PDF, JPG, PNG. Max size: 10MB per file.
            </p>
          </div>

          {uploading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Uploading files...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recently Uploaded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {uploadedFiles.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(doc.status)}
                    <div>
                      <p className="font-medium text-sm">{doc.fileName}</p>
                      <p className="text-xs text-gray-500">{doc.fileSize} • {new Date(doc.uploadDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {doc.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUpload;
