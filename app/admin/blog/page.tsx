'use client';

import { useEffect, useState } from 'react';

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  author: {
    name: string;
    image: string;
    designation: string;
  } | null;
  content?: string;
};

export default function AdminBlogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingAuthor, setUploadingAuthor] = useState(false);
  const [coverPreview, setCoverPreview] = useState('');
  const [authorPreview, setAuthorPreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    coverImage: '',
    tags: '',
    authorName: '',
    authorImage: '',
    authorDesignation: '',
    content: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = sessionStorage.getItem('adminAuth');
      if (authStatus === 'success') {
        setIsAuthenticated(true);
        fetchPosts();
        setIsLoading(false);
      } else {
        window.location.href = '/admin/index.html';
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      author: {
        name: formData.authorName,
        image: formData.authorImage,
        designation: formData.authorDesignation,
      },
    };

    try {
      const url = editingPost ? `/api/blogs/${editingPost.slug}` : '/api/blogs';
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        await fetchPosts();
        setShowForm(false);
        setEditingPost(null);
        setFormData({
          title: '',
          date: new Date().toISOString().split('T')[0],
          excerpt: '',
          coverImage: '',
          tags: '',
          authorName: '',
          authorImage: '',
          authorDesignation: '',
          content: '',
        });
        setCoverPreview('');
        setAuthorPreview('');
        alert(editingPost ? 'Blog post updated successfully!' : 'Blog post created successfully!');
      } else {
        alert('Failed to save blog post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving blog post');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      tags: post.tags.join(', '),
      authorName: post.author?.name || '',
      authorImage: post.author?.image || '',
      authorDesignation: post.author?.designation || '',
      content: post.content || '',
    });
    setCoverPreview(post.coverImage);
    setAuthorPreview(post.author?.image || '');
    setShowForm(true);
  };

  const handleDelete = async (slug: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/blogs/${slug}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await fetchPosts();
          alert('Blog post deleted successfully!');
        } else {
          alert('Failed to delete blog post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting blog post');
      }
    }
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingCover(true);
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({ ...prev, coverImage: data.url }));
          setCoverPreview(data.url);
        }
      } catch (error) {
        console.error('Error uploading cover image:', error);
        alert('Error uploading cover image');
      } finally {
        setUploadingCover(false);
      }
    }
  };

  const handleAuthorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingAuthor(true);
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({ ...prev, authorImage: data.url }));
          setAuthorPreview(data.url);
        }
      } catch (error) {
        console.error('Error uploading author image:', error);
        alert('Error uploading author image');
      } finally {
        setUploadingAuthor(false);
      }
    }
  };

  if (isLoading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Redirecting to login...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#333' }}>📝 Blog Management</h1>
        <div>
          <button
            onClick={() => window.location.href = '/admin'}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            ← Back to Admin
          </button>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            ➕ Create New Post
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '30px',
        }}>
          <h2 style={{ marginTop: 0, color: '#333' }}>
            {editingPost ? '✏️ Edit Blog Post' : '➕ Create New Blog Post'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Description *
              </label>
              <textarea
                required
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={4}
                placeholder="Write a detailed description of your blog post..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Tags (comma-separated) *
              </label>
              <input
                type="text"
                required
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="e.g., technology, AI, web development"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Author Name
              </label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                placeholder="Author name"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Author Designation
              </label>
              <input
                type="text"
                value={formData.authorDesignation}
                onChange={(e) => setFormData(prev => ({ ...prev, authorDesignation: e.target.value }))}
                placeholder="e.g., Senior Developer, Tech Lead"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Author Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAuthorImageUpload}
                disabled={uploadingAuthor}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
              />
              {uploadingAuthor && <p style={{ marginTop: '5px', color: '#007bff' }}>Uploading author image...</p>}
              {authorPreview && (
                <img
                  src={authorPreview}
                  alt="Author preview"
                  style={{
                    marginTop: '10px',
                    maxWidth: '100px',
                    maxHeight: '100px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid #ddd',
                  }}
                />
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageUpload}
                disabled={uploadingCover}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
              />
              {uploadingCover && <p style={{ marginTop: '5px', color: '#007bff' }}>Uploading cover image...</p>}
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  style={{
                    marginTop: '10px',
                    maxWidth: '200px',
                    maxHeight: '150px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                    border: '2px solid #ddd',
                  }}
                />
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Content (Markdown)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={10}
                placeholder="Write your blog post content in Markdown format..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontFamily: 'monospace',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                  setFormData({
                    title: '',
                    date: new Date().toISOString().split('T')[0],
                    excerpt: '',
                    coverImage: '',
                    tags: '',
                    authorName: '',
                    authorImage: '',
                    authorDesignation: '',
                    content: '',
                  });
                  setCoverPreview('');
                  setAuthorPreview('');
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ marginTop: 0, color: '#333' }}>📚 Published Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            No blog posts found. Create your first post above!
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {posts.map((post) => (
              <div
                key={post.slug}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '20px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                }}
              >
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    style={{
                      width: '120px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '15px' }}>
                    <h3 style={{ margin: 0, color: '#333' }}>{post.title}</h3>
                    {post.author?.image && (
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #ddd',
                        }}
                      />
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                      📅 {new Date(post.date).toLocaleDateString()}
                    </p>
                    {post.author?.name && (
                      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                        👤 {post.author.name}
                      </p>
                    )}
                    {post.author?.designation && (
                      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                        💼 {post.author.designation}
                      </p>
                    )}
                  </div>
                  <p style={{ margin: '0 0 10px 0', color: '#007bff', fontSize: '12px' }}>
                    🏷️ {post.tags.join(', ')}
                  </p>
                  <p style={{ margin: '0 0 15px 0', color: '#555', lineHeight: '1.5' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleEdit(post)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
