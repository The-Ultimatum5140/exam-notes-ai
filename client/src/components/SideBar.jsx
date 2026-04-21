import React from "react";
import { motion } from "framer-motion";

const SideBar = ({ result, darkMode }) => {
  if (!result) return null;

  return (
    <div
      className={`p-5 rounded-2xl space-y-6 ${
        darkMode
          ? "bg-white/10 border border-white/20 text-white"
          : "bg-white border border-gray-200 text-black shadow-lg"
      }`}
    >
      <h2 className="text-lg font-bold">📌 Quick View</h2>

      {/* SUBTOPICS */}
      {result.subTopics &&
        Object.entries(result.subTopics).map(([star, topics]) => (
          <motion.div
            key={star}
            whileHover={{ scale: 1.02 }}
            className={`p-3 rounded-xl ${
              darkMode ? "bg-white/5" : "bg-gray-50"
            }`}
          >
            <p className="font-semibold mb-1">{star} Priority</p>

            <ul className="list-disc ml-5 text-sm">
              {topics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </motion.div>
        ))}

      {/* IMPORTANCE */}
      <div>
        <p className="text-sm font-semibold mb-1">Importance</p>
        <span className="text-yellow-500 font-bold">{result.importance}</span>
      </div>

      {/* QUESTIONS */}
      {result.questions && (
        <div className="space-y-3">
          <MiniBlock title="Short" data={result.questions.short} />
          <MiniBlock title="Long" data={result.questions.long} />
          <MiniBlock title="Diagram" data={result.questions.diagram} />
        </div>
      )}
    </div>
  );
};

function MiniBlock({ title, data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="text-sm">
      <p className="font-semibold">{title}</p>
      <ul className="list-disc ml-4">
        {data.slice(0, 3).map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
