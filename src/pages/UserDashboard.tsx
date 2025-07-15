
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, User, LogOut } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import SEO from '@/components/SEO';

interface UserData {
  id: string;
  title: string;
  description: string | null;
  data: any;
  created_at: string;
  updated_at: string;
}

const UserDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    data: '{}'
  });

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('user_data')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch your data",
          variant: "destructive",
        });
        return;
      }

      setUserData(data || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let parsedData = {};
      try {
        parsedData = JSON.parse(formData.data);
      } catch {
        parsedData = { content: formData.data };
      }

      if (editingItem) {
        const { error } = await supabase
          .from('user_data')
          .update({
            title: formData.title,
            description: formData.description,
            data: parsedData,
          })
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Data updated successfully!",
        });
      } else {
        const { error } = await supabase
          .from('user_data')
          .insert({
            user_id: user!.id,
            title: formData.title,
            description: formData.description,
            data: parsedData,
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Data created successfully!",
        });
      }

      setFormData({ title: '', description: '', data: '{}' });
      setEditingItem(null);
      setIsDialogOpen(false);
      fetchUserData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: UserData) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      data: JSON.stringify(item.data, null, 2),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_data')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Data deleted successfully!",
      });
      fetchUserData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete data",
        variant: "destructive",
      });
    }
  };

  const handleNewItem = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', data: '{}' });
    setIsDialogOpen(true);
  };

  return (
    <>
      <SEO 
        title="Dashboard - TaxConsult Pro"
        description="Manage your personal data and access your tax consultation services."
        keywords="user dashboard, personal data, tax management"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  TaxConsult Pro
                </h1>
                <Badge variant="secondary">
                  <User className="w-3 h-3 mr-1" />
                  {profile?.role}
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {profile?.full_name || user?.email}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Dashboard
                </CardTitle>
                <CardDescription>
                  Manage your personal data and documents securely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      You have {userData.length} data entries
                    </p>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleNewItem}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Data
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          {editingItem ? 'Edit Data' : 'Add New Data'}
                        </DialogTitle>
                        <DialogDescription>
                          {editingItem ? 'Update your data entry' : 'Create a new data entry'}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter title"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter description (optional)"
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="data">Data (JSON format)</Label>
                          <Textarea
                            id="data"
                            value={formData.data}
                            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                            placeholder='{"key": "value"}'
                            rows={5}
                            className="font-mono text-sm"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Data Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <div className="col-span-full flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : userData.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No data entries yet. Create your first one!</p>
                </div>
              ) : (
                userData.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      {item.description && (
                        <CardDescription>{item.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-muted p-3 rounded-md">
                          <pre className="text-xs overflow-auto">
                            {JSON.stringify(item.data, null, 2)}
                          </pre>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">
                            Created: {new Date(item.created_at).toLocaleDateString()}
                          </p>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
