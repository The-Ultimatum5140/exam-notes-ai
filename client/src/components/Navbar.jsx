import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../redux/userSlice"; 

const serverUrl = "http://localhost:8000"; 

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);

  const credits = userData?.credits ?? 0;

  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout
  const handleSignOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const firstLetter =
    typeof userData?.name === "string" && userData.name.length > 0
      ? userData.name.charAt(0).toUpperCase()
      : "U";

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 mx-6 mt-6 rounded-2xl 
      bg-gradient-to-br from-black/90 via-black/80 to-black/90
      border border-white/10 backdrop-blur-2xl 
      shadow-[0_20px_50px_rgba(0,0,0,0.7)]
      flex items-center justify-between px-8 py-4"
    >
      {/* 🔹 Left */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="logo" className="w-9 h-9" />
        <span className="text-lg hidden md:block font-semibold text-white">
          ExamNotes<span className="text-gray-400">AI</span>
        </span>
      </div>

      {/* 🔹 Right */}
      <div className="flex items-center gap-5 relative">
        {/* 💎 Credits */}
        <motion.div
          onClick={() => {
            setShowCredits((prev) => !prev);
            setShowProfile(false);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-white/10 border border-white/20 
          px-4 py-1.5 rounded-full cursor-pointer hover:bg-white/20 transition"
        >
          <span className="text-yellow-400">💎</span>
          <span className="text-white text-sm font-medium">{credits}</span>
          <span className="text-xs">➕</span>
        </motion.div>

        {/* 💳 Credits Dropdown */}
        <AnimatePresence>
          {showCredits && (
            <motion.div
              key="credits"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-12 w-72 bg-black/90 border border-white/10 
              backdrop-blur-xl rounded-xl p-4 text-white shadow-xl"
            >
              <h4 className="font-semibold mb-2">Buy Credits</h4>
              <p className="text-sm text-gray-400 mb-3">
                Generate AI notes & PDFs
              </p>
              <button onClick={()=>navigate("/pricing")} className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                Buy Now 🚀
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 👤 Avatar */}
        <motion.div
          onClick={() => {
            setShowProfile((prev) => !prev);
            setShowCredits(false);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="h-9 w-9 flex items-center justify-center rounded-full 
          bg-gradient-to-br from-blue-500 to-purple-500 
          text-white font-bold cursor-pointer shadow"
        >
          {firstLetter}
        </motion.div>

        {/* 👤 Profile Dropdown */}
        <AnimatePresence>
          {showProfile && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-12 w-48 bg-black/90 border border-white/10 
              backdrop-blur-xl rounded-xl p-3 text-white shadow-xl"
            >
              <p className="text-sm font-medium mb-2">
                {userData?.name || "User"}
              </p>

              <MenuItem
                text="Profile"
                onClick={() => {
                  navigate("/profile");
                  setShowProfile(false);
                }}
              />

              <MenuItem
                text="History"
                onClick={() => {
                  navigate("/history");
                  setShowProfile(false);
                }}
              />

              <MenuItem
                text="Logout"
                red
                onClick={() => {
                  handleSignOut();
                  setShowProfile(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// 🔹 Reusable Menu Item
function MenuItem({ onClick, text, red }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left text-sm px-2 py-1 rounded transition
      ${
        red
          ? "text-red-400 hover:bg-red-500/10"
          : "text-white hover:bg-white/10"
      }`}
    >
      {text}
    </button>
  );
}

export default Navbar;