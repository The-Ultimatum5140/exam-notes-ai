import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import ReChartSetUp from "../components/ReChartSetUp";
import MermaidSetup from "../components/MermaidSetup";

const History = () => {
  const [topics, setTopics] = useState([]);
  const [isSideBar, setSideBar] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits ?? 0;

  // fetch list
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/notes/getnotes", {
          withCredentials: true,
        });
        setTopics(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, []);

  // open single note
  const openNotes = async (id) => {
    try {
      setLoading(true);

      const res = await axios.get(`${serverUrl}/api/notes/${id}`, {
        withCredentials: true,
      });

      setSelectedNote(res.data.result);
      setSideBar(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* NAVBAR */}
      <div className="flex justify-between p-4 bg-black text-white">
        <h1 className="font-bold">ExamNotes AI</h1>

        <div className="flex gap-3">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "🌙" : "☀️"}
          </button>

          <span>💎 {credits}</span>

          <button className="md:hidden" onClick={() => setSideBar(true)}>
            ☰
          </button>
        </div>
      </div>

      <div className="flex">
        {/* 🟢 DESKTOP SIDEBAR */}
        <div className="hidden md:block w-64 p-4 border-r">
          <h2 className="mb-4 font-semibold">📜 History</h2>

          {topics.map((t) => (
            <div
              key={t._id}
              onClick={() => openNotes(t._id)}
              className="cursor-pointer p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10"
            >
              {t.topic}
            </div>
          ))}
        </div>

        {/* MOBILE SIDEBAR */}
        <AnimatePresence>
          {isSideBar && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed top-0 left-0 w-64 h-full bg-white text-black p-4 z-50"
            >
              <button onClick={() => setSideBar(false)}>⬅ Back</button>

              {topics.map((t) => (
                <div
                  key={t._id}
                  onClick={() => openNotes(t._id)}
                  className="p-2 cursor-pointer"
                >
                  {t.topic}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN VIEW */}
        <div className="flex-1 p-6">
          {!selectedNote && <p>Select a note from sidebar</p>}

          {loading && <p>Loading...</p>}

          {!loading && selectedNote && (
            <div className="space-y-8">
              {/* 🔥 TITLE */}
              <h2 className="text-2xl font-bold">{selectedNote.topic}</h2>

              {/* 🔥 SUBTOPICS */}
              {selectedNote.subTopics && (
                <div>
                  <h3 className="font-semibold mb-2">⭐ SubTopics</h3>
                  {Object.entries(selectedNote.subTopics).map(
                    ([star, topics]) => (
                      <div key={star}>
                        <p>{star}</p>
                        <ul className="ml-5 list-disc">
                          {topics.map((t, i) => (
                            <li key={i}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </div>
              )}

              {/* MARKDOWN NOTES */}
              {selectedNote.notes && (
                <div className="prose max-w-none">
                  <ReactMarkdown>{selectedNote.notes}</ReactMarkdown>
                </div>
              )}

              {/* REVISION */}
              {selectedNote.revisionPoints && (
                <div>
                  <h3 className="font-semibold">⚡ Revision</h3>
                  <ul className="ml-5 list-disc">
                    {selectedNote.revisionPoints.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* QUESTIONS */}
              {selectedNote.questions && (
                <div>
                  <h3 className="font-semibold">❓ Questions</h3>

                  {["short", "long", "diagram"].map((type) => (
                    <div key={type}>
                      <p className="font-medium">{type}</p>
                      <ul className="ml-5 list-disc">
                        {selectedNote.questions[type]?.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* CHARTS */}
              {selectedNote.chart && (
                <ReChartSetUp charts={[selectedNote.chart]} />
              )}

              {/* DIAGRAM */}
              {selectedNote.diagram && (
                <MermaidSetup diagram={selectedNote.diagram} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
