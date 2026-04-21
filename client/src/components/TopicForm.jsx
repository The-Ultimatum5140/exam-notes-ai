import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { generateNotes } from "../services/api";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice";

const TopicForm = ({ setResult, setLoading, loading, setError }) => {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  const dispatch = useDispatch();

  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter topic");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });

      setProgress(100);
      setProgressText("Done");

      if (typeof res.creditsLeft === "number") {
        dispatch(updateCredits(res.creditsLeft));
      }

      setTimeout(() => {
        setResult(res.data);
        setLoading(false);
      }, 500);

    } catch (err) {
      setError("Failed to generate notes");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }

    let val = 0;

    const interval = setInterval(() => {
      val += Math.random() * 10;

      if (val >= 90) {
        val = 90;
        setProgressText("Finalizing...");
      } else if (val >= 50) {
        setProgressText("Generating...");
      } else {
        setProgressText("Thinking...");
      }

      setProgress(Math.floor(val));
    }, 400);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter Topic"
        className="w-full p-3 rounded-xl border"
      />

      <input
        value={classLevel}
        onChange={(e) => setClassLevel(e.target.value)}
        placeholder="Class Level"
        className="w-full p-3 rounded-xl border"
      />

      <input
        value={examType}
        onChange={(e) => setExamType(e.target.value)}
        placeholder="Exam Type"
        className="w-full p-3 rounded-xl border"
      />

      <div className="flex flex-wrap gap-4">
        <Toggle label="Revision Mode" checked={revisionMode} onChange={() => setRevisionMode(!revisionMode)} />
        <Toggle label="Diagram" checked={includeDiagram} onChange={() => setIncludeDiagram(!includeDiagram)} />
        <Toggle label="Chart" checked={includeChart} onChange={() => setIncludeChart(!includeChart)} />
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold"
      >
        {loading ? "Generating..." : "Generate Notes"}
      </motion.button>

      {loading && (
        <>
          <div className="h-2 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-blue-500"
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-center">{progressText}</p>
        </>
      )}
    </motion.div>
  );
};

function Toggle({ label, checked, onChange }) {
  return (
    <div onClick={onChange} className="flex items-center gap-2 cursor-pointer">
      <div className={`w-10 h-5 rounded-full ${checked ? "bg-green-400" : "bg-gray-300"}`}>
        <div
          className="w-4 h-4 bg-white rounded-full mt-0.5"
          style={{ transform: checked ? "translateX(20px)" : "translateX(2px)" }}
        />
      </div>
      <span>{label}</span>
    </div>
  );
}

export default TopicForm;