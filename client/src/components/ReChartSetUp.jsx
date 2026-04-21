import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

const ReChartSetUp = ({ charts }) => {
  if (!charts || charts.length === 0) return null;

  return (
    <div className="space-y-6">
      {charts.map((chart, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition"
        >
          <h4 className="text-lg font-semibold mb-3">📊 {chart.title}</h4>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              {/* BAR */}
              {chart.type === "bar" && (
                <BarChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}

              {/* LINE */}
              {chart.type === "line" && (
                <LineChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />
                </LineChart>
              )}

              {/* PIE */}
              {chart.type === "pie" && (
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ReChartSetUp;
