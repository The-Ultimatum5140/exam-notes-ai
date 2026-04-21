import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { motion } from "framer-motion";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r?\n/g, "\n")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/,/g, "");

  if (!clean.trim().startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const MermaidSetup = ({ diagram }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const safe = cleanMermaidChart(diagram);

        const { svg } = await mermaid.render(id, safe);
        containerRef.current.innerHTML = svg;
      } catch (err) {
        console.error("Mermaid error:", err);
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg overflow-x-auto"
    >
      <div ref={containerRef} />
    </motion.div>
  );
};

export default MermaidSetup;
