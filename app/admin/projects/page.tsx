'use client';

import { useEffect, useState } from 'react';

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoLink: string;
  image: string;
  featured: boolean;
  category: string;
};

export default function AdminProjectsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    demoLink: '',
    image: '',
    featured: false,
    category: 'web'
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = sessionStorage.getItem('adminAuth');
      if (authStatus === 'success') {
        setIsAuthenticated(true);
        fetchProjects();
        setIsLoading(false);
      } else {
        window.location.href = '/admin/index.html';
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech),
    };

    try {
      const url = editingProject ? `/api/projects` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProject ? { ...projectData, id: editingProject.id } : projectData),
      });

      if (response.ok) {
        await fetchProjects();
        setShowForm(false);
        setEditingProject(null);
        setFormData({
          title: '',
          description: '',
          techStack: '',
          demoLink: '',
          image: '',
          featured: false,
          category: 'web'
        });
        setImagePreview('');
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      demoLink: project.demoLink,
      image: project.image,
      featured: project.featured,
      category: project.category
    });
    setImagePreview(project.image);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects?id=${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await fetchProjects();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({ ...prev, image: data.url }));
          setImagePreview(data.url);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploadingImage(false);
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
        <h1 style={{ margin: 0, color: '#333' }}>🚀 Project Management</h1>
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
            ➕ Create New Project
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
            {editingProject ? '✏️ Edit Project' : '➕ Create New Project'}
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
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                  }}
                >
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile App</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
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
                Tech Stack (comma-separated) *
              </label>
              <input
                type="text"
                required
                value={formData.techStack}
                onChange={(e) => setFormData(prev => ({ ...prev, techStack: e.target.value }))}
                placeholder="e.g., React, Node.js, MongoDB"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Demo Link *
                </label>
                <input
                  type="url"
                  required
                  value={formData.demoLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, demoLink: e.target.value }))}
                  placeholder="https://demo.example.com"
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
                  Project Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                  }}
                />
                {uploadingImage && <p style={{ marginTop: '5px', color: '#007bff' }}>Uploading...</p>}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Project preview"
                    style={{
                      marginTop: '10px',
                      maxWidth: '200px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                    }}
                  />
                )}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  style={{ marginRight: '8px' }}
                />
                Featured Project
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProject(null);
                  setFormData({
                    title: '',
                    description: '',
                    techStack: '',
                    demoLink: '',
                    image: '',
                    featured: false,
                    category: 'web'
                  });
                  setImagePreview('');
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
                {editingProject ? 'Update Project' : 'Create Project'}
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
        <h2 style={{ marginTop: 0, color: '#333' }}>📚 Projects ({projects.length})</h2>
        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            No projects found. Create your first project above!
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '20px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                }}
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '120px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                    {project.title} {project.featured && '⭐'}
                  </h3>
                  <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                    🏷️ {project.category} • 🔗 {project.demoLink}
                  </p>
                  <p style={{ margin: '0 0 15px 0', color: '#555', lineHeight: '1.5' }}>
                    {project.description}
                  </p>
                  <p style={{ margin: '0 0 15px 0', color: '#007bff', fontSize: '12px' }}>
                    🛠️ {project.techStack.join(', ')}
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleEdit(project)}
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
                      onClick={() => handleDelete(project.id)}
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
