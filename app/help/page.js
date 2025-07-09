"use client";

import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Contact = () => {
  const handleEmailClick = () => {
    const subject = encodeURIComponent("Hello Mohit");
    const body = encodeURIComponent("I want to connect with you!");
    window.location.href = `mailto:mohityadavhh@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-gray-800 mt-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Whether it’s a job, a project, or just a friendly hello — my inbox is always open!
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <p className="text-xl mb-6 text-gray-700">
          Feel free to reach out through any of the platforms below:
        </p>

        <div className="flex justify-center flex-wrap gap-6 text-3xl mb-10">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mohityadavhh@gmail.com&su=Hello%20Mohit&body=I%20want%20to%20connect%20with%20you!"
            className="text-indigo-600 hover:text-indigo-800 transition"
            title="Email"
            target="_blank"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://wa.me/916392609366"
            target="_blank"
            rel="noreferrer"
            className="text-green-500 hover:text-green-700 transition"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.instagram.com/mohityadav.h?igsh=ZnR1eXY2d3o5MXk="  
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 hover:text-pink-700 transition"
            title="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/in/mohit-kumar-yadav-898711230"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 transition"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Mohithh"
            target="_blank"
            rel="noreferrer"
            className="text-gray-800 hover:text-gray-600 transition"
            title="GitHub"
          >
            <FaGithub />
          </a>
        </div>

        <div>
          <button
            onClick={handleEmailClick}
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow hover:shadow-lg transition-all"
          >
            ✉️ Drop Me a Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
