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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
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
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingAuthor, setUploadingAuthor] = useState(false);
  const [coverPreview, setCoverPreview] = useState('');
  const [authorPreview, setAuthorPreview] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = sessionStorage.getItem('adminAuth');
      if (authStatus === 'success') {
        setIsAuthenticated(true);
        fetchPosts();
        setIsLoading(false);
      } else {
        // Redirect to login page
        window.location.href = '/admin/index.html';
      }
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blogs', {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched posts:', data);
      if (data.posts && Array.isArray(data.posts)) {
        setPosts(data.posts);
        console.log(`Loaded ${data.posts.length} blog posts`);
      } else {
        console.warn('No posts in response:', data);
        setPosts([]);
      }
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
      // Show user-friendly error
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        alert('⚠️ Cannot connect to server. Make sure you are running in development mode (npm run dev). API routes do not work in static export.');
      } else {
        alert(`Failed to load blog posts: ${error.message}`);
      }
      setPosts([]);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    window.location.href = '/admin/index.html';
  };

  const handleImageUpload = async (file: File, type: 'cover' | 'author') => {
    if (!file) return;

    const setUploading = type === 'cover' ? setUploadingCover : setUploadingAuthor;
    setUploading(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const result = await response.json();

      if (response.ok && result.url) {
        if (type === 'cover') {
          setFormData((prev) => ({ ...prev, coverImage: result.url }));
          setCoverPreview(result.url);
        } else {
          setFormData((prev) => ({ ...prev, authorImage: result.url }));
          setAuthorPreview(result.url);
        }
        alert('✅ Image uploaded successfully!');
      } else {
        alert(`❌ Upload failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(`❌ Error uploading image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const postData = {
      title: formData.title,
      date: formData.date,
      excerpt: formData.excerpt,
      coverImage: formData.coverImage,
      tags: tagsArray,
      author: {
        name: formData.authorName,
        image: formData.authorImage,
        designation: formData.authorDesignation,
      },
      content: formData.content,
    };

    try {
      if (editingPost) {
        // Update existing post
        const response = await fetch(`/api/blogs/${editingPost.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          alert('Blog post updated successfully!');
          resetForm();
          fetchPosts();
        } else {
          alert('Failed to update blog post');
        }
      } else {
        // Create new post
        console.log('Creating post with data:', postData);
        const response = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });

        const result = await response.json();
        console.log('Create response:', result);
        
        if (response.ok) {
          alert('✅ Blog post created successfully!');
          resetForm();
          fetchPosts();
        } else {
          alert(`❌ Failed to create: ${result.error || 'Unknown error'}`);
          console.error('Create error:', result);
        }
      }
    } catch (error: any) {
      console.error('Error saving post:', error);
      alert(`❌ Error: ${error.message || 'An error occurred while saving the blog post'}`);
    }
  };

  const handleEdit = async (slug: string) => {
    try {
      const response = await fetch(`/api/blogs/${slug}`);
      const post = await response.json();
      
      setFormData({
        title: post.title || '',
        date: post.date || new Date().toISOString().split('T')[0],
        excerpt: post.excerpt || '',
        coverImage: post.coverImage || '',
        tags: post.tags?.join(', ') || '',
        authorName: post.author?.name || '',
        authorImage: post.author?.image || '',
        authorDesignation: post.author?.designation || '',
        content: post.content || '',
      });
      
      setCoverPreview(post.coverImage || '');
      setAuthorPreview(post.author?.image || '');
      setEditingPost(post);
      setShowForm(true);
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('Failed to load blog post for editing');
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete "${slug}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Blog post deleted successfully!');
        fetchPosts();
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the blog post');
    }
  };

  const resetForm = () => {
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
    setEditingPost(null);
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          textAlign: 'center'
        }}>
          <h2>🔐 Loading...</h2>
          <p>Please wait while we verify your access.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>🚀 NeuByte CMS</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Content Management System</p>
        </div>
        <div>
          <a
            href="/admin/projects"
            style={{
              background: 'white',
              color: '#667eea',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              marginRight: '10px',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            🚀 Projects
          </a>
          <a
            href="/admin/blog"
            style={{
              background: 'white',
              color: '#667eea',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              marginRight: '10px',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            📝 Blog
          </a>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: 'white',
              color: '#667eea',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              marginRight: '10px',
              fontWeight: 'bold'
            }}
          >
            {showForm ? '❌ Cancel' : '➕ New Post'}
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid white',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Blog Post Form */}
        {showForm && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginBottom: '30px'
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
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                    Publish Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Cover Image
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file, 'cover');
                        }
                      }}
                      disabled={uploadingCover}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '14px',
                        marginBottom: '10px'
                      }}
                    />
                    <input
                      type="text"
                      value={formData.coverImage}
                      onChange={(e) => {
                        setFormData({ ...formData, coverImage: e.target.value });
                        setCoverPreview(e.target.value);
                      }}
                      placeholder="/images/blog/blog-01.jpg"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                      Upload an image or enter image URL
                    </p>
                  </div>
                  {(coverPreview || formData.coverImage) && (
                    <div style={{ width: '150px', height: '100px', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                      <img
                        src={coverPreview || formData.coverImage}
                        alt="Cover preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                {uploadingCover && (
                  <p style={{ fontSize: '12px', color: '#667eea', marginTop: '5px' }}>
                    ⏳ Uploading...
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="AI, Web Development, Small Business"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                    Author Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file, 'author');
                      }
                    }}
                    disabled={uploadingAuthor}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      marginBottom: '10px'
                    }}
                  />
                  <input
                    type="text"
                    value={formData.authorImage}
                    onChange={(e) => {
                      setFormData({ ...formData, authorImage: e.target.value });
                      setAuthorPreview(e.target.value);
                    }}
                    placeholder="/images/blog/CEO.jpeg"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  {uploadingAuthor && (
                    <p style={{ fontSize: '12px', color: '#667eea', marginTop: '5px' }}>
                      ⏳ Uploading...
                    </p>
                  )}
                  {(authorPreview || formData.authorImage) && (
                    <div style={{ marginTop: '10px', width: '60px', height: '60px', border: '1px solid #ddd', borderRadius: '50%', overflow: 'hidden' }}>
                      <img
                        src={authorPreview || formData.authorImage}
                        alt="Author preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                    Author Designation
                  </label>
                  <input
                    type="text"
                    value={formData.authorDesignation}
                    onChange={(e) => setFormData({ ...formData, authorDesignation: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Content (Markdown) *
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={15}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '6px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {editingPost ? '💾 Update Post' : '✨ Create Post'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    background: '#f5f5f5',
                    color: '#333',
                    border: '1px solid #ddd',
                    padding: '12px 30px',
                    borderRadius: '6px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blog Posts List */}
        <div>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>
            📝 Blog Posts ({posts.length})
          </h2>
          
          {posts.length === 0 ? (
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '10px',
              textAlign: 'center',
              color: '#666'
            }}>
              <p>No blog posts yet. Create your first post!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {posts.map((post) => (
                <div
                  key={post.slug}
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                      {post.title}
                    </h3>
                    <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                      {post.excerpt || 'No excerpt'}
                    </p>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '15px', fontSize: '12px', color: '#999' }}>
                      <span>📅 {post.date}</span>
                      <span>🏷️ {post.tags?.join(', ') || 'No tags'}</span>
                      {post.author && <span>👤 {post.author.name}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleEdit(post.slug)}
                      style={{
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
