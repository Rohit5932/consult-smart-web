
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, UserPlus } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: "lead" | "client" | "prospect";
  lastContact: string;
}

const CRMIntegration = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      company: "ABC Pvt Ltd",
      status: "client",
      lastContact: "2024-01-15"
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 87654 32109",
      status: "lead",
      lastContact: "2024-01-10"
    }
  ]);

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const addContact = () => {
    if (!newContact.name || !newContact.email) return;

    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact,
      status: "lead",
      lastContact: new Date().toISOString().split('T')[0]
    };

    setContacts(prev => [...prev, contact]);
    setNewContact({ name: "", email: "", phone: "", company: "" });
  };

  const updateContactStatus = (id: string, status: Contact['status']) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id ? { ...contact, status } : contact
    ));
  };

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case "client": return "default";
      case "prospect": return "secondary";
      case "lead": return "outline";
      default: return "outline";
    }
  };

  const syncWithCRM = async () => {
    // This would sync with HubSpot/Salesforce API
    console.log("Syncing with CRM...", contacts);
    alert("CRM sync feature requires API integration with HubSpot or Salesforce");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          CRM Integration
        </CardTitle>
        <CardDescription>Manage your client relationships and leads</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add New Contact */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add New Contact
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  placeholder="Email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newContact.company}
                  onChange={(e) => setNewContact({...newContact, company: e.target.value})}
                  placeholder="Company name"
                />
              </div>
            </div>
            <Button onClick={addContact} className="mt-3" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>

          {/* Contacts List */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Contacts ({contacts.length})</h4>
              <Button onClick={syncWithCRM} variant="outline" size="sm">
                Sync with CRM
              </Button>
            </div>
            
            {contacts.map((contact) => (
              <div key={contact.id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {contact.email} • {contact.phone}
                    </div>
                    {contact.company && (
                      <div className="text-sm text-muted-foreground">{contact.company}</div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1">
                      Last contact: {contact.lastContact}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateContactStatus(contact.id, "client")}
                        className="text-xs h-6"
                      >
                        Client
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateContactStatus(contact.id, "prospect")}
                        className="text-xs h-6"
                      >
                        Prospect
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
            <strong>Note:</strong> Full CRM integration requires API setup with HubSpot or Salesforce. 
            Configure your CRM credentials in the admin panel for automatic sync.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CRMIntegration;
