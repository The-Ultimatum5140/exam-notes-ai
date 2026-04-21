import React from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";
import { getCurrentUser } from "../services/api";
import axios from "axios";
import {
  FaBook,
  FaChartBar,
  FaFilePdf,
  FaBrain,
  FaBolt,
} from "react-icons/fa";
import { serverUrl } from "../App.jsx";

import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, rotateX: -10 },
  show: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleGoogleAuth = async () => {
  try {
    const response = await signInWithPopup(auth, provider);

    const user = response.user;
    const name = user.displayName;
    const email = user.email;

    await axios.post(
      `${serverUrl}/api/auth/google`,
      { name, email },
      { withCredentials: true }
    );
    await getCurrentUser(dispatch);

    navigate("/");
  } catch (err) {
    console.log("Google Auth Error:", err);
  }
};

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-black selection:bg-indigo-100 font-sans antialiased overflow-x-hidden">
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto pt-8 lg:pt-10 px-6 text-center lg:text-left"
      >
        <h1 className="text-2xl lg:text-3xl font-black tracking-tighter bg-gradient-to-r from-gray-950 via-gray-600 to-gray-950 bg-clip-text text-transparent">
          ExamNotes AI
        </h1>
        <p className="text-gray-500 text-sm font-medium mt-1">
          AI-powered exam-oriented notes & smart revision
        </p>
      </motion.header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-16 mt-8 lg:mt-12 pb-20 items-start">
        
        {/* LEFT */}
        <motion.div
          className="lg:col-span-5 text-center lg:text-left pt-2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tighter">
            Unlock Smart <br />
            <span className="text-indigo-600">AI Notes</span>
          </h1>

          <p className="mt-4 lg:mt-6 text-gray-600 text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
            Generate exam-ready notes, charts, and PDFs instantly using AI.
          </p>

          <div className="mt-8 lg:mt-10 space-y-6">
            <motion.button
              onClick={handleGoogleAuth}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 bg-gray-950 text-white px-8 py-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:bg-gray-800 transition-all font-semibold w-full sm:w-auto mx-auto lg:mx-0"
            >
              <FcGoogle size={22} className="bg-white rounded-full p-0.5" />
              Continue with Google
            </motion.button>

            <div className="space-y-1">
              <p className="text-gray-600 text-sm lg:text-base">
                You get <span className="font-semibold text-gray-950">50 free credits</span> to start.
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                Upgrade anytime • Instant access
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5 [perspective:1200px]"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <Feature
            icon={<FaBrain />}
            title="AI-Powered Notes"
            description="Generate structured and concise notes instantly using AI."
            className="md:col-span-2 bg-gray-950 text-white shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
            iconColor="text-indigo-400"
            isDark={true}
          />

          <Feature icon={<FaBook />} title="Exam-Oriented" description="Focus on key concepts & important topics." />
          <Feature icon={<FaBolt />} title="Quick Revision" description="Revise faster with clean structured content." />
          <Feature icon={<FaFilePdf />} title="PDF Downloads" description="Download notes anytime." />
          <Feature icon={<FaChartBar />} title="Charts & Graphs" description="Visual learning with charts." />
        </motion.div>

      </main>
    </div>
  );
};

function Feature({ icon, title, description, className = "bg-white", iconColor = "text-indigo-600", isDark = false }) {
  const shadowStyle = isDark
    ? ""
    : "shadow-[0_1px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.05)]";

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -8,
        rotateY: 7,
        rotateX: 2,
        transition: { duration: 0.3 },
      }}
      className={`relative p-6 lg:p-8 rounded-[2rem] border border-gray-100 transition-all flex flex-col justify-between min-h-[170px] ${shadowStyle} ${className}`}
    >
      <div className={`${iconColor} text-2xl lg:text-3xl`}>
        {icon}
      </div>

      <div className="mt-4 lg:mt-6">
        <h3 className="text-lg lg:text-xl font-bold">{title}</h3>
        <p className={`${isDark ? "text-gray-300" : "text-gray-500"} text-sm mt-1`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default Auth;