import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopicForm from "../components/TopicForm";
import SideBar from "../components/SideBar";
import FinalResult from "../components/FinalResult";
import { motion } from "framer-motion";

const Notes = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits ?? 0;

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved !== null) setDarkMode(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-black via-gray-900 to-black text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black"
      }`}
    >
      {/*  NAVBAR */}
      <div className="w-full px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center bg-black text-white shadow-lg">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-xl font-bold tracking-tight"
        >
          ExamNotes AI
        </h1>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-2 py-1 rounded bg-white/10"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          <button
            onClick={() => navigate("/pricing")}
            className="px-3 py-1 bg-white text-black rounded-full text-sm shadow"
          >
            💎 {credits}
          </button>

          <button
            onClick={() => navigate("/history")}
            className="px-3 py-1 bg-white text-black rounded-lg text-sm shadow"
          >
            📜 Notes
          </button>
        </div>
      </div>

      {/* 🔥 FORM */}
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <div
          className={`p-6 rounded-3xl backdrop-blur-xl border ${
            darkMode
              ? "bg-white/5 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
              : "bg-white border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
          }`}
        >
          <TopicForm
            loading={loading}
            setLoading={setLoading}
            setResult={setResult}
            setError={setError}
          />
        </div>
      </div>

      {/* 🔥 RESULT AREA */}
      <div className="max-w-7xl mx-auto mt-12 px-4">
        {/* LOADING */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`h-60 flex flex-col items-center justify-center rounded-3xl ${
              darkMode
                ? "bg-white/10 border border-white/20"
                : "bg-white border border-gray-300"
            }`}
          >
            <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-lg font-medium">Generating AI Notes...</p>
          </motion.div>
        )}

        {/* PLACEHOLDER */}
        {!loading && !result && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`h-60 flex flex-col items-center justify-center rounded-3xl ${
              darkMode
                ? "bg-white/10 border border-white/20 text-white"
                : "bg-white border border-gray-300 text-gray-800"
            }`}
          >
            <span className="text-4xl mb-3">📋</span>
            <p>Your notes will appear here</p>
          </motion.div>
        )}

        {/* RESULT */}
        {!loading && result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <SideBar result={result} darkMode={darkMode} />
            </div>

            {/* MAIN */}
            <div
              className={`lg:col-span-3 p-6 rounded-3xl backdrop-blur-xl ${
                darkMode
                  ? "bg-white/10 border border-white/20"
                  : "bg-white border border-gray-300"
              }`}
            >
              <FinalResult result={result} />
            </div>
          </motion.div>
        )}

        {error && <p className="text-red-500 text-center mt-6">{error}</p>}
      </div>
    </div>
  );
};

export default Notes;
