
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const AdminServices = () => {
  const [services, setServices] = useState([
    { id: 1, title: "GST Registration", description: "Complete GST registration process", icon: "📝" },
    { id: 2, title: "GST Filing", description: "Monthly and quarterly GST returns", icon: "📊" },
    { id: 3, title: "Income Tax Returns", description: "ITR filing for individuals and businesses", icon: "💰" }
  ]);

  const [newService, setNewService] = useState({ title: "", description: "", icon: "" });

  const addService = () => {
    if (newService.title && newService.description) {
      setServices([...services, { ...newService, id: Date.now() }]);
      setNewService({ title: "", description: "", icon: "" });
    }
  };

  const deleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin - Services Management</h1>
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="hover:text-primary">Dashboard</Link>
              <Link to="/" className="hover:text-primary">Back to Site</Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Manage Services</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Service</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>Create a new service offering</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={newService.title}
                    onChange={(e) => setNewService({...newService, title: e.target.value})}
                    placeholder="Enter service title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                    placeholder="Enter service description"
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon (emoji)</Label>
                  <Input
                    id="icon"
                    value={newService.icon}
                    onChange={(e) => setNewService({...newService, icon: e.target.value})}
                    placeholder="📝"
                  />
                </div>
                <Button onClick={addService} className="w-full">Add Service</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="text-3xl mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteService(service.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminServices;
