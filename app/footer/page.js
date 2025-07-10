import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        {/* Column 1: Brand Info */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold mb-3">Mohit Kumar Yadav</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            MERN Stack & Next.js Developer. Focused on building scalable, modern
            web solutions with a passion for clean UI & performance.
          </p>
          <p className="text-sm text-indigo-400 flex items-center gap-2">
            <a
              href="mailto:mohityadavhh@gmail.com"
              className="hover:underline text-lg"
            >
              Mail: mohityadavhh@gmail.com
            </a>
          </p>
        </div>

      

        {/* Column 3: Technologies */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Technologies</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Next.js</li>
            <li>MongoDB & Express</li>
            <li>React.js</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        {/* Column 4: Quick Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Info</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>📍 Uttar Pradesh, India</li>
            <li>🕓 Available for Freelance</li>
            <li>💼 Open to Opportunities</li>
            <li>🛠️ Building Cool Stuff Daily</li>
          </ul>
        </div>
      </div>

      {/* Divider + Socials + Copyright */}
      <div className="max-w-6xl mx-auto px-6 mt-12 border-t border-gray-700 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-3 md:mb-0">© {new Date().getFullYear()} Mohit Kumar Yadav. All rights reserved.</p>
          <div className="flex gap-5">
            <a
              href="https://www.linkedin.com/in/mohit-kumar-yadav-898711230/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="hover:scale-110 transition"
            >
              <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/Mohithh"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="hover:scale-110 transition"
            >
              <img src="/github.png" alt="GitHub" className="w-6 h-6" />
            </a>
            <a
              href="mailto:mohityadavhh@gmail.com"
              title="Email"
              className="hover:scale-110 transition"
            >
              <img src="/ggmail.png" alt="Email" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
