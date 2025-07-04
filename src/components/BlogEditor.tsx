
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface BlogEditorProps {
  post?: BlogPost;
  onSave: (post: Partial<BlogPost>) => void;
  onCancel: () => void;
}

const BlogEditor = ({ post, onSave, onCancel }: BlogEditorProps) => {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState(post?.category || '');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [published, setPublished] = useState(post?.published || false);

  const handleSave = () => {
    const blogPost: Partial<BlogPost> = {
      id: post?.id || Date.now().toString(),
      title,
      excerpt,
      content,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      publishDate: post?.publishDate || new Date().toISOString(),
      published
    };
    onSave(blogPost);
  };

  const categories = ['Tax Tips', 'GST Updates', 'Government Updates', 'Business Registration'];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{post ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog post title"
          />
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief description of the post"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tax, gst, business"
          />
        </div>

        <div>
          <Label htmlFor="content">Content (Markdown supported)</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog post content here. You can use markdown formatting."
            rows={15}
            className="font-mono"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <Label htmlFor="published">Publish immediately</Label>
        </div>

        <div className="flex space-x-4">
          <Button onClick={handleSave}>
            {post ? 'Update Post' : 'Save Post'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogEditor;
