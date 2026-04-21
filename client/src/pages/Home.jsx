import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import img from "../assets/img1.png";
import Footer from "../components/Footer"
import {useNavigate} from "react-router-dom"
import Notes from "../pages/Notes"

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black">
      <Navbar />

      {/*  Top Section */}
      <section className="max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ rotateX: 6, rotateY: -6 }}
            className="transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1
              className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent"
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
            >
              Create Smart <br /> AI Notes in Seconds
            </motion.h1>

            <motion.p
              whileHover={{ y: -2 }}
              className="mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent"
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
            >
              Generate exam-focused notes, project documentation, flow diagrams,
              and revision-ready content using AI — faster, cleaner, smarter.
            </motion.p>

            <motion.button
              onClick={()=>navigate("/notes")}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 flex items-center justify-center gap-3 bg-gray-950 text-white px-8 py-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:bg-gray-800 transition-all font-semibold w-full sm:w-auto"
            >
              Get Started 🚀
            </motion.button>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{
            y: -12,
            rotateX: 8,
            rotateY: -8,
            scale: 1.05,
          }}
          className="transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src={img}
              alt="AI Notes"
              className="w-full"
              style={{ transform: "translateZ(35px)" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Bottom Section */}
      <section className="max-w-6xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-10">
        <Feature icon="📖" title="Exam Notes" description="High-yield exam-oriented notes with AI" />
        <Feature icon="📂" title="Project Notes" description="Structured content for assignments & projects" />
        <Feature icon="📊" title="Diagrams" description="Auto-generated visual diagrams for clarity" />
        <Feature icon="📄" title="PDF Downloads" description="Download clean printable PDFs instantly" />
      </section>
      <Footer/>
    </div>
  );
};

function Feature({ icon, title, description }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="show"
      whileHover={{
        y: -8,
        rotateY: 7,
        rotateX: 2,
        transition: { duration: 0.3 },
      }}
      className="p-6 lg:p-8 rounded-2xl border border-gray-100 shadow-md bg-white"
    >
      <div className="text-3xl">{icon}</div>

      <div className="mt-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>
    </motion.div>
  );
}

export default Home;