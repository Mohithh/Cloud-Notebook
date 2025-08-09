"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";


export default function SignUpPage() {
  const router = useRouter(); 

    const [first, setfirst] = useState(true)
    const [second, setsecond] = useState(false)
      const [finalmail, setfinalmail] = useState("")
      const [sendmail, setsendmail] = useState("Send mail")
          const [message, setMessage] = useState("");
            const [cotp, setcotp] = useState("")
          
            const [otpbox, setotpbox] = useState(false)
      
            const [userotp, setuserotp] = useState("")
        
    
    

  const [name, setName] = useState("");
  const [email, setEmail] = useState(finalmail);
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    // const data = { name, finalmail, password };
    const data = { name, email: finalmail, password };


    try {
        const response = await fetch(`/api/LoginNew`, {  

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        
      });

      
      const res = await response.json();

      if (res.success) {
        toast.success("Account created successfully!", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce, 
        });

        setName("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
       else {
        toast.error(res.error || "Account already exists", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  };
    const finalmaill = async (e) => {  
      setfinalmail(e.target.value)
    }

    const sendingmail = async (e) => { 

       e.preventDefault(); 
    setMessage("Sending...");

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP 
const text = `🔐 Your verification code is: ${otp}\nThis OTP is valid for 10 minutes.\n\n— Sent by Mohit Yadav | Cloud Notebook Team`;
    setcotp(otp)
    const subject = "verification Mail";


    try {
      const res = await fetch("/api/varificationMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:finalmail, text:text,subject }), // pass email and generated text
      });

      const data = await res.json();

      if (data.success) {
        setMessage(data.message);
        setotpbox(true)
        setsendmail("Resend mail")
        

      } else {
        setMessage(data.error || "Failed to send email");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    }
     const submitotp = async (e) => {
    
          // console.log("cotp",cotp)
          // console.log("userotp",userotp)
          e.preventDefault();
          // console.log("submitotp")
          
          if (userotp ==cotp) {
    
            // console.log("otp matched")
            setfirst(false)
            setsecond(true)
            setotpbox(false)
            toast.success("OTP verified", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.error("Invalid OTP", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
        const valueotp = (e) => {
          setuserotp(e.target.value)
        }



  return (
      <div>

      {first && (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4">
    <form className="bg-white border border-blue-200 shadow-lg rounded-xl p-6 w-full max-w-sm space-y-4 animate-fade-in">
      
      {/* Email */}
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-gray-700">
          Email Address
        </label>
        <input
          required
          onChange={finalmaill}
          type="email"
          id="email"
          placeholder="Enter your email"
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Send Mail Button */}
      <button
        onClick={sendingmail}
        type="button"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-200"
      >
        {sendmail}
      </button>

      {/* Message */}
      {message && <p className="text-sm text-red-500 font-medium">{message}</p>}
      {/* {cotp && <p className="text-xs text-gray-400">OTP sent: {cotp}</p>} */}

      {/* OTP Box */}
      {otpbox && (
        <div className="pt-2 space-y-3 border-t border-gray-200">
          <div>
            <label className="text-sm font-semibold text-gray-700">Enter OTP</label>
            <input
              required
              onChange={valueotp}
              type="number"
              placeholder="6-digit OTP"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="button"
            onClick={submitotp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-all"
          >
            Verify OTP
          </button>
        </div>
      )}
    </form>

    {/* Display entered email below form */}
    <p className="absolute bottom-6 text-xs text-gray-500">{finalmail}</p>
  </div>
)}


    {second && <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="flex max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Form */}

      
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-emerald-600 mb-2">Create Account</h2>
          <p className="text-sm text-gray-500 mb-8">
            Sign up to access all features.
          </p>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={finalmail}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition duration-200 shadow-md"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-600 hover:underline font-medium">
              Sign In
            </a>
          </div>
        </div>

        {/* Right Side - Illustration */}

        <div>
          <Image
            src="/Signup.png"
            alt="Sign Up Illustration"
            width={500}
            height={500}
            className="hidden md:block w-full h-auto object-cover"
          />
        </div>
       
      </div>

      <ToastContainer />
    </div>}


    </div>
  );
}