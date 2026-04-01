import React, { useState } from "react";
import { Cell } from "recharts";
import "./Charts.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Legend
} from "recharts";
const COLORS = [
  "#4f46e5", // indigo
  "#22c55e", // green
  "#ef4444", // red
  "#f59e0b", // yellow
  "#06b6d4", // cyan
  "#a855f7", // purple
  "#ec4899", // pink
  "#10b981"  // emerald
];

function Charts({ data }) {
  const [view, setView] = useState("daily");

  // 📊 GROUP DATA (daily / monthly / yearly)
  const grouped = {};

  data.forEach((t) => {
    const dateObj = new Date(t.date);
    let key;

    if (view === "daily") {
      key = t.date;
    } else if (view === "monthly") {
      key = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`;
    } else {
      key = `${dateObj.getFullYear()}`;
    }

    if (!grouped[key]) {
      grouped[key] = { name: key, income: 0, expense: 0 };
    }

    if (t.type === "Income") {
      grouped[key].income += t.amount;
    } else {
      grouped[key].expense += t.amount;
    }
  });

  const lineData = Object.values(grouped);

//   // 🥧 PIE DATA (category wise)
//   const categoryMap = {};
//   data.forEach((t) => {
//     categoryMap[t.category] =
//       (categoryMap[t.category] || 0) + t.amount;
//   });

//   const pieData = Object.keys(categoryMap).map((key) => ({
//     name: key,
//     value: categoryMap[key]
//   }));
// ✅ FILTER ONLY EXPENSES
const expenseData = data.filter((t) => t.type === "Expense");

// ✅ GROUP BY CATEGORY
const categoryMap = {};

expenseData.forEach((t) => {
  categoryMap[t.category] =
    (categoryMap[t.category] || 0) + t.amount;
});

// ✅ CONVERT TO PIE FORMAT
const pieData = Object.keys(categoryMap).map((key) => ({
  name: key,
  value: categoryMap[key]
}));
  return (
    <div className="charts-container">

      {/* 📊 LINE CHART */}
      <div className="chart-card">
        <div className="chart-header">
          <h4>Income vs Expense</h4>

          <div className="chart-buttons">
            <button onClick={() => setView("daily")}>Daily</button>
            <button onClick={() => setView("monthly")}>Monthly</button>
            <button onClick={() => setView("yearly")}>Yearly</button>
          </div>
        </div>
           <div className="line-wrapper">
        <LineChart width={500} height={250} data={lineData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={3}
          />
        </LineChart>
      </div>
      </div>

      {/* 🥧 PIE CHART */}
      <div className="chart-card">
        <h4>Spending Breakdown</h4>
        
  <div className="pie-wrapper">

        <PieChart width={300} height={250}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >{pieData.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
     </div>
    </div>
  );
}

export default Charts;