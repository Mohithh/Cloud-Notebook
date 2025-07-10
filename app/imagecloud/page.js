"use client";
import { useEffect, useState } from "react";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

export default function ImagePage() {
  const router = useRouter();
  const [useremail, setUseremail] = useState("");
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkuser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("/api/useremail", {
            method: "POST",
            headers: { "Content-Type": "application/json", token },
          });
          const data = await res.json();

          if (data.success) {
            setUseremail(data.email);
            await fetchUploads(data.email);
          } else {
            localStorage.removeItem("token");
            toast.error("🔒 Please login again", { transition: Bounce });
            router.push("/login");
          }
        } catch (err) {
          toast.error("⚠️ Error fetching user", { transition: Bounce });
        }
      } else {
        router.push("/login");
      }
    };

    checkuser();
  }, [router]); // Added router to dependency array

  const fetchUploads = async (email) => {
    try {
      const res = await fetch(`/api/fetchemail?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.success) {
        setUploads(data.uploads);
      }
    } catch (err) {
      toast.error("⚠️ Error loading files", { transition: Bounce });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("email", useremail);
    formData.append("file", file);

    try {
      const res = await fetch("/api/addimage", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("✅ Upload successful");
        setFile(null);
        await fetchUploads(useremail);
      } else {
        toast.error("❌ Upload failed: " + data.message);
      }
    } catch (err) {
      toast.error("⚠️ Error uploading file");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this file?");
    if (!confirm) return;

    try {
      const res = await fetch("/api/deleteimage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: useremail, id }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("🗑️ File deleted");
        await fetchUploads(useremail);
      } else {
        toast.error("❌ Delete failed: " + data.message);
      }
    } catch (err) {
      toast.error("⚠️ Error deleting file");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="colored"
        transition={Bounce}
      />

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-blue-600 font-bold text-2xl">Cloud</div>
            <div className="text-gray-600 font-medium text-2xl">Notebook</div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 hidden md:block">
              Welcome, <span className="font-medium">{useremail}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              {useremail.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Upload Section */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-1">Upload files</h2>
              <p className="text-sm text-gray-600">Drag and drop files here or click to browse</p>
            </div>
            
            <form onSubmit={handleUpload} className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="file"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload" 
                  className="block px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  Select Files
                </label>
              </div>
              <button 
                type="submit" 
                disabled={!file}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload
              </button>
            </form>
          </div>
          
          {file && (
            <div className="mt-4 p-3 bg-white rounded-md border border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800 truncate max-w-xs">{file.name}</span>
              </div>
              <button 
                onClick={() => setFile(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Files Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">My Files</h2>
            <div className="text-sm text-gray-500">
              {uploads.length} {uploads.length === 1 ? 'item' : 'items'}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : uploads.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No files uploaded yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by uploading your first file</p>
            </div>
          ) : (
            <div className="space-y-4 sm:hidden">
              {/* Mobile view - stacked cards */}
              {uploads.map((file) => (
                <div key={file.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {file.contentType.startsWith("image/") ? (
                        <div className="h-12 w-12 relative rounded-md overflow-hidden">
                          <Image 
                            src={file.base64} 
                            alt={file.originalName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : file.contentType === "application/pdf" ? (
                        <div className="h-12 w-12 bg-red-100 rounded-md flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                      ) : (
                        <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.originalName}</p>
                      <p className="text-xs text-gray-500">{file.contentType}</p>
                      <div className="mt-2 flex space-x-3">
                        <a
                          href={file.base64}
                          download={file.originalName}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Download
                        </a>
                        <button
                          onClick={() => handleDelete(file.id)}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Desktop table view (hidden on mobile) */}
          <div className="hidden sm:block bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {uploads.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            {file.contentType.startsWith("image/") ? (
                              <div className="h-10 w-10 relative rounded-md overflow-hidden">
                                <Image 
                                  src={file.base64} 
                                  alt={file.originalName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : file.contentType === "application/pdf" ? (
                              <div className="h-10 w-10 bg-red-100 rounded-md flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </div>
                            ) : (
                              <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.originalName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{file.contentType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <a
                            href={file.base64}
                            download={file.originalName}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Download
                          </a>
                          <button
                            onClick={() => handleDelete(file.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
 