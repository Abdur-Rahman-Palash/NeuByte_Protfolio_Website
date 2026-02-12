'use client';

import { useEffect, useState } from 'react';

interface SolutionsContent {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  showProjects: boolean;
}

export default function AdminSolutionsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<SolutionsContent>({
    title: 'Our Solutions',
    subtitle: 'Web Development Excellence',
    description: 'Crafting modern, responsive web applications with cutting-edge technologies and AI integration.',
    buttonText: 'See Our Projects',
    showProjects: true
  });

  useEffect(() => {
    // Check authentication
    const authStatus = sessionStorage.getItem('cms_auth');
    if (authStatus === 'success') {
      setIsAuthenticated(true);
      loadContent();
    } else {
      window.location.href = '/admin/login-simple.html';
    }
    setIsLoading(false);
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/api/solutions-content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error loading solutions content:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/solutions-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });

      if (response.ok) {
        alert('✅ Solutions content updated successfully!');
      } else {
        alert('❌ Failed to update content. Please try again.');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('❌ Error saving content. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please login to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Solutions Content Management</h1>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            💾 Save Changes
          </button>
        </div>

        {/* Content Editor */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Title
              </label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => setContent({...content, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={content.subtitle}
                onChange={(e) => setContent({...content, subtitle: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={content.description}
                onChange={(e) => setContent({...content, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={content.buttonText}
                onChange={(e) => setContent({...content, buttonText: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="showProjects"
                checked={content.showProjects}
                onChange={(e) => setContent({...content, showProjects: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showProjects" className="ml-2 block text-sm text-gray-900">
                Show &quot;See Our Projects&quot; Button
              </label>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📝️ Instructions</h3>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>Edit the content above to customize the Solutions page</li>
            <li>Toggle the &quot;Show Projects&quot; button to show/hide the projects section</li>
            <li>Click &quot;Save Changes&quot; to update the live Solutions page</li>
            <li>Projects are managed separately in the Projects admin section</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
