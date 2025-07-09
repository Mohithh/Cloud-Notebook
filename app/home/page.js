"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

import Link from 'next/link';

const page = () => {
      const router = useRouter();
      const [loading, setloading] = useState(true)
        const [useremail, setuseremail] = useState("");


    useEffect(() => {

        // Check if the user is already logged in
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            setloading(true)
        }
        else{
            setloading(false)
            // You can also fetch user data here if needed
            // const userData = await fetchUserData(token);
            // setUser(userData);
        }
      
   
    }, [])

      useEffect(() => {
    const checkuser = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        setloading(true)
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/useremail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const res = await response.json();

        if (res.success) {
          setuseremail(res.email);
        } else {
          setError(res.message || "Something went wrong");
        }
      } catch (err) {
        alert("Something went wrong, please try again later.");

      } finally {
        setloading(false)
      }

      
    };

    checkuser();
  }, []);
    
  return (
    <div>

        {loading && <div className='flex justify-center items-center h-screen'>Loading...</div>}

        {!loading && (
            <div className='flex justify-center items-center h-screen'>
                <h1 className='text-2xl font-bold'>Welcome to the Home Page  your email {useremail}</h1>

                <Link href={"/textcloud"}>Uploadtext cloud</Link>



            </div>
        )}
      
    </div>
  )
}

export default page
