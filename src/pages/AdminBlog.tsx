
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import BlogEditor from "@/components/BlogEditor";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishDate: string;
  published: boolean;
}

const AdminBlog = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "GST Filing Deadlines for 2024: Complete Guide",
      excerpt: "Stay updated with all GST filing deadlines and avoid penalties. Complete guide for businesses.",
      content: "# GST Filing Deadlines for 2024\n\nThis is the content...",
      category: "GST Updates",
      tags: ["GST", "Deadlines", "2024"],
      publishDate: "2024-03-15T00:00:00.000Z",
      published: true
    }
  ]);

  const handleSavePost = (post: Partial<BlogPost>) => {
    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...post } : p));
    } else {
      setPosts([...posts, post as BlogPost]);
    }
    setShowEditor(false);
    setEditingPost(undefined);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  if (showEditor) {
    return (
      <div className="min-h-screen bg-background p-8">
        <BlogEditor
          post={editingPost}
          onSave={handleSavePost}
          onCancel={() => {
            setShowEditor(false);
            setEditingPost(undefined);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TaxConsult Pro</h1>
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="hover:text-primary">Dashboard</Link>
              <Link to="/" className="hover:text-primary">Home</Link>
              <Link to="/services" className="hover:text-primary">Services</Link>
              <Link to="/about" className="hover:text-primary">About</Link>
              <Link to="/contact" className="hover:text-primary">Contact</Link>
              <Link to="/blog" className="hover:text-primary font-semibold">Blog</Link>
              <Link to="/updates" className="hover:text-primary">Updates</Link>
            </div>
          </nav>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <Button onClick={() => setShowEditor(true)}>Create New Post</Button>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Published: {new Date(post.publishDate).toLocaleDateString()}
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;
