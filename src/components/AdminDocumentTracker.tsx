
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, User } from "lucide-react";

interface DocumentData {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  status: "pending" | "processing" | "completed";
  uploadDate: string;
  clientName: string;
}

const AdminDocumentTracker = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);

  useEffect(() => {
    const loadDocuments = () => {
      const stored = localStorage.getItem('documents');
      if (stored) {
        setDocuments(JSON.parse(stored));
      }
    };

    loadDocuments();
    const interval = setInterval(loadDocuments, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = (id: string, newStatus: "pending" | "processing" | "completed") => {
    const updatedDocuments = documents.map(doc => 
      doc.id === id ? { ...doc, status: newStatus } : doc
    );
    setDocuments(updatedDocuments);
    localStorage.setItem('documents', JSON.stringify(updatedDocuments));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(documents, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `documents_${new Date().toISOString().split('T')[0]}.json`;
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Tracker
            </CardTitle>
            <CardDescription>Manage uploaded client documents</CardDescription>
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
              <span>{documents.filter(d => d.status === 'pending').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">Processing</Badge>
              <span>{documents.filter(d => d.status === 'processing').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">Completed</Badge>
              <span>{documents.filter(d => d.status === 'completed').length}</span>
            </div>
          </div>

          <div className="rounded-md border max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client & File</TableHead>
                  <TableHead>File Details</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                      No documents found
                    </TableCell>
                  </TableRow>
                ) : (
                  documents.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-2 font-medium">
                            <User className="h-4 w-4" />
                            {document.clientName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <FileText className="h-3 w-3" />
                            {document.fileName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{document.fileSize}</div>
                          <div className="text-gray-500">{document.fileType}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(document.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(document.id, 'processing')}
                            disabled={document.status !== 'pending'}
                          >
                            Process
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(document.id, 'completed')}
                            disabled={document.status === 'completed'}
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

export default AdminDocumentTracker;
