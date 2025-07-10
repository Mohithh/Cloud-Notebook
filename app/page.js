"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {  // Changed from InfoPage to HomePage
  const router = useRouter();

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    // console.log()
    if (token) {
      router.push("/imagecloud");
    }  

  }, [])
  

  const features = [
    { icon: '🔐', title: 'Secure Login', description: 'Create your account with OTP verification for secure access to your personal cloud storage.' },
    { icon: '✏️', title: 'Add Text Notes', description: 'Store and organize your thoughts, ideas, and important information in text format.' },
    { icon: '🖼️', title: 'Upload Images', description: 'Save your favorite images and access them anytime from any device.' },
    { icon: '📱', title: 'Responsive Design', description: 'Access your content seamlessly on mobile, tablet, or desktop.' },
    { icon: '🔄', title: 'Real-time Sync', description: 'Your data syncs instantly across all your devices.' },
    { icon: '🔍', title: 'Easy Search', description: 'Quickly find your notes and images with our powerful search feature.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <ToastContainer position="top-center" autoClose={3000} theme="light" transition={Bounce} />
      
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-2">About Our Platform</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Your secure, all-in-one storage solution for text and images.</p>
        </div>

        {/* Getting Started */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Getting Started</h2>
          <div className="space-y-8">
            {[
              {
                step: '1️⃣',
                title: 'Login or Create Account',
                description: 'Start by creating your account with OTP verification or login if you already have one.',
                button: true
              },
              {
                step: '2️⃣',
                title: 'Add Your Content',
                description: 'Once logged in, you can add text notes or upload images through the simple interface.'
              },
              {
                step: '3️⃣',
                title: 'Access Anytime',
                description: 'Your content is securely stored and accessible from any device with your login credentials.'
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-full w-fit">{item.step}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-500 mt-1">{item.description}</p>
                  {item.button && (
                    <button
                      onClick={() => router.push('/login')}
                      className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm"
                    >
                      Go to Login
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow text-center sm:text-left">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How do I reset my password?',
                a: 'Simply request an OTP on the login page and follow the verification process to set a new password.'
              },
              {
                q: 'Is there a storage limit?',
                a: 'Free accounts get 1GB of storage. Premium plans with more storage are coming soon!'
              },
              {
                q: 'Can I share my content?',
                a: 'Currently content is private to your account. Sharing features will be available in future updates.'
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-800">{faq.q}</h3>
                <p className="text-gray-500 mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Need More Help?</h2>
          <button
            onClick={() => router.push('/help')}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;  // Changed from InfoPage to HomePage