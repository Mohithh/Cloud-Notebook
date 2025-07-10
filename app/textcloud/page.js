"use client";
import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [useremail, setUseremail] = useState("");
  const [subject, setSubject] = useState("");
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");
  const [alldata, setAlldata] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({ subject: "", tag: "", message: "" });
  const [isCreating, setIsCreating] = useState(false); // New state for create note loading

  const deleteinfo = async (id, email) => {
    const res = await fetch("/api/deletetextcloud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, email }),
    });
    if (res.ok) {
      toast.info("🗑️ Deleted successfully", { transition: Bounce });
      refresh();
    } else {
      toast.error("❌ Error deleting note", { transition: Bounce });
    }
  };

  const editinfo = (item) => {
    setEditingId(item._id);
    setEditData({ subject: item.subject, tag: item.tag, message: item.message });
    setShowEdit(true);
  };

  const updateinfo = async () => {
    const res = await fetch("/api/edittextcloud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: editingId,
        email: useremail,
        subject: editData.subject,
        tag: editData.tag,
        message: editData.message,
      }),
    });
    if (res.ok) {
      toast.success("✅ Note updated", { transition: Bounce });
      refresh();
      setShowEdit(false);
    } else {
      toast.error("❌ Update failed", { transition: Bounce });
    }
  };

  const refresh = useCallback(async () => {
    if (!useremail) return;
    const res = await fetch("/api/fetchtextcloud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: useremail }),
    });
    const data = await res.json();
    if (res.ok) {
      setAlldata(data.data);
      setLoading(false);
    }
  }, [useremail]);

  const submitform = async (e) => {
    e.preventDefault();
    setIsCreating(true); // Start loading
    try {
      const res = await fetch("/api/textcloud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, tag, message, email: useremail }),
      });
      if (res.ok) {
        toast.success("✅ Note added", { transition: Bounce });
        refresh();
        setSubject("");
        setTag("");
        setMessage("");
      } else {
        toast.error("❌ Failed to save", { transition: Bounce });
      }
    } finally {
      setIsCreating(false); // Stop loading regardless of outcome
    }
  };

  const changing = (e) => {
    const { name, value } = e.target;
    if (name === "subject") setSubject(value);
    else if (name === "tag") setTag(value);
    else if (name === "message") setMessage(value);
  };

  useEffect(() => {
    const checkuser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const res = await fetch("/api/useremail", {
          method: "POST",
          headers: { "Content-Type": "application/json", token },
        });
        const data = await res.json();
        if (data.success) {
          setUseremail(data.email);
          const allRes = await fetch("/api/fetchtextcloud", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.email }),
          });
          const notes = await allRes.json();
          if (allRes.ok) {
            setAlldata(notes.data);
          }
        } else {
          toast.error("🔒 Please login again", { transition: Bounce });
        }
      } catch (err) {
        toast.error("⚠️ Error fetching user", { transition: Bounce });
      } finally {
        setLoading(false); // Ensure loading is set to false in all cases
      }
    };
    checkuser();
  }, [router]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

      {/* Google Drive-like Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-blue-600 font-bold text-2xl">Text</div>
            <div className="text-gray-600 font-medium text-2xl">Cloud</div>
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
        {/* Create Note Section */}
        <div className="mb-8 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4">Create New Note</h2>
          <form onSubmit={submitform} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  required
                  name="subject"
                  onChange={changing}
                  value={subject}
                  placeholder="Meeting notes"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                <input
                  required
                  name="tag"
                  onChange={changing}
                  value={tag}
                  placeholder="Work"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                required
                name="message"
                onChange={changing}
                value={message}
                placeholder="Write your note here..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isCreating}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex justify-center items-center"
            >
              {isCreating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Note"
              )}
            </button>
          </form>
        </div>

        {/* Notes Section */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">My Notes</h2>
          <div className="text-sm text-gray-500">
            {alldata.length} {alldata.length === 1 ? 'note' : 'notes'}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : alldata.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notes created yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first note</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {alldata.map((item) => (
              <div key={item._id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.tag}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editinfo(item)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteinfo(item._id, useremail)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{item.subject}</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap mb-3">{item.message}</p>
                  <div className="text-xs text-gray-500">
                    <p>Created: {new Date(item.createdAt).toLocaleDateString()}</p>
                    <p>Updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {showEdit && (
          <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl border border-gray-200">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Edit Note</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      name="subject"
                      value={editData.subject}
                      onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                    <input
                      name="tag"
                      value={editData.tag}
                      onChange={(e) => setEditData({ ...editData, tag: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      name="message"
                      value={editData.message}
                      onChange={(e) => setEditData({ ...editData, message: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowEdit(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateinfo}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Page;