import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="z-10 mx-6 mb-6 mt-24 rounded-2xl 
      bg-gradient-to-br from-black/90 via-black/80 to-black/90 
      backdrop-blur-2xl border border-white/10 
      px-8 py-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-white">
        
        {/* 🔹 Brand */}
        <motion.div
          whileHover={{ rotateX: 6, rotateY: -6 }}
          className="flex flex-col gap-4 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="flex items-center gap-3 cursor-pointer"
            style={{ transform: "translateZ(25px)" }}
          >
            <img src="/logo.png" alt="logo" className="h-9 w-9" />
            <span
              className="text-lg font-semibold"
              style={{
                textShadow: "0 6px 18px rgba(0,0,0,0.4)",
              }}
            >
              ExamNotes <span className="text-gray-400">AI</span>
            </span>
          </div>

          <p
            className="text-sm text-gray-400 leading-relaxed"
            style={{ transform: "translateZ(20px)" }}
          >
            ExamNotes AI helps students generate exam notes, revision material,
            diagrams and printable PDFs using AI.
          </p>
        </motion.div>

        {/* 🔹 Quick Links (WITH HOVER ANIMATION 🔥) */}
        <motion.div
          whileHover={{ rotateX: 6, rotateY: -6 }}
          className="flex flex-col gap-3 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <h4 style={{ transform: "translateZ(25px)" }}>Quick Links</h4>

          {[
            { name: "Home", path: "/" },
            { name: "Notes", path: "/notes" },
            { name: "History", path: "/history" },
            { name: "Profile", path: "/profile" },
          ].map((link, i) => (
            <motion.button
              key={i}
              onClick={() => navigate(link.path)}
              whileHover={{ x: 6, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-left text-gray-400 hover:text-white transition"
              style={{ transform: "translateZ(20px)" }}
            >
              {link.name}
            </motion.button>
          ))}
        </motion.div>

        {/* 🔹 CTA */}
        <motion.div
          whileHover={{ rotateX: 6, rotateY: -6 }}
          className="flex flex-col gap-3 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <h4 style={{ transform: "translateZ(25px)" }}>Get Started</h4>

          <p
            className="text-gray-400 text-sm"
            style={{ transform: "translateZ(20px)" }}
          >
            Start generating smart AI notes today 🚀
          </p>

          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 
            px-4 py-2 rounded-lg font-medium shadow-lg"
            style={{ transform: "translateZ(25px)" }}
          >
            Try Now
          </motion.button>
        </motion.div>
      </div>

      {/* 🔻 Bottom */}
      <div className="mt-10 border-t border-white/10 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ExamNotes AI. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;