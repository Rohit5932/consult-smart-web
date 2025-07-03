
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const AdminBlog = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "GST Filing Deadlines for 2024",
      excerpt: "Complete guide for GST filing deadlines",
      category: "GST Updates",
      date: "2024-03-15"
    },
    {
      id: 2,
      title: "Income Tax Exemptions Under Section 80C",
      excerpt: "Maximize your tax savings with Section 80C",
      category: "Tax Tips",
      date: "2024-03-10"
    }
  ]);

  const [newArticle, setNewArticle] = useState({
    title: "",
    excerpt: "",
    category: "",
    content: ""
  });

  const addArticle = () => {
    if (newArticle.title && newArticle.excerpt) {
      setArticles([
        ...articles,
        {
          ...newArticle,
          id: Date.now(),
          date: new Date().toISOString().split('T')[0]
        }
      ]);
      setNewArticle({ title: "", excerpt: "", category: "", content: "" });
    }
  };

  const deleteArticle = (id) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin - Blog Management</h1>
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="hover:text-primary">Dashboard</Link>
              <Link to="/" className="hover:text-primary">Back to Site</Link>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </nav>
        </div>
      </header>

      <SignedOut>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Admin Access Required</h2>
          <SignInButton>
            <Button size="lg">Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Manage Blog Posts</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add New Article</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Blog Article</DialogTitle>
                  <DialogDescription>Create a new blog post</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="article-title">Article Title</Label>
                    <Input
                      id="article-title"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                      placeholder="Enter article title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Input
                      id="excerpt"
                      value={newArticle.excerpt}
                      onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                      placeholder="Brief description of the article"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                      placeholder="e.g., Tax Tips, GST Updates"
                    />
                  </div>
                  <Button onClick={addArticle} className="w-full">Publish Article</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{article.excerpt}</CardDescription>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteArticle(article.id)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SignedIn>
    </div>
  );
};

export default AdminBlog;
