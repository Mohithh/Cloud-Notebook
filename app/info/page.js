"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InfoPage = () => {
  const router = useRouter();

  const features = [
    {
      emoji: '🔐',
      title: 'Secure Login',
      description: 'Create your account with OTP verification for secure access to your personal cloud storage.'
    },
    {
      emoji: '✏️',
      title: 'Add Text Notes',
      description: 'Store and organize your thoughts, ideas, and important information in text format.'
    },
    {
      emoji: '🖼️',
      title: 'Upload Images',
      description: 'Save your favorite images and access them anytime from any device.'
    },
    {
      emoji: '📱',
      title: 'Responsive Design',
      description: 'Access your content seamlessly on mobile, tablet, or desktop.'
    },
    {
      emoji: '🔄',
      title: 'Real-time Sync',
      description: 'Your data syncs instantly across all your devices.'
    },
    {
      emoji: '🔍',
      title: 'Easy Search',
      description: 'Quickly find your notes and images with our powerful search feature.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 px-4 py-12">
      <ToastContainer theme="colored" />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-purple-700 mb-3">ℹ️ About TextCloud</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your secure, all-in-one storage solution for text and images
          </p>
        </div>

        {/* Getting Started Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">🚀 Getting Started</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <span className="text-xl">1️⃣</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Login or Create Account</h3>
                <p className="text-gray-600">
                  Start by creating your account with OTP verification or login if you already have one.
                </p>
                <button 
                  onClick={() => router.push('/login')}
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-md transition-all"
                >
                  Go to Login
                </button>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-pink-100 p-3 rounded-full mr-4">
                <span className="text-xl">2️⃣</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Add Your Content</h3>
                <p className="text-gray-600">
                  Once logged in, you can add text notes or upload images through the simple interface.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <span className="text-xl">3️⃣</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Access Anytime</h3>
                <p className="text-gray-600">
                  Your content is securely stored and accessible from any device with your login credentials.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">✨ Key Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">{feature.emoji}</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">❓ Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="font-semibold text-lg">How do I reset my password?</h3>
              <p className="text-gray-600 mt-1">
                Simply request an OTP on the login page and follow the verification process to set a new password.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <h3 className="font-semibold text-lg">Is there a storage limit?</h3>
              <p className="text-gray-600 mt-1">
                Free accounts get 1GB of storage. Premium plans with more storage are coming soon!
              </p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <h3 className="font-semibold text-lg">Can I share my content?</h3>
              <p className="text-gray-600 mt-1">
                Currently content is private to your account. Sharing features will be available in future updates.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">Need More Help?</h2>
          <button 
            onClick={() => router.push('/help')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;