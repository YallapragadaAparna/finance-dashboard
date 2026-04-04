import React, { useState } from "react";
import "./Charts.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const COLORS = ["#4f46e5", "#22c55e", "#ef4444", "#f59e0b"];

function Charts({ data }) {
  const [view, setView] = useState("daily");

  // ✅ GROUP DATA FOR LINE CHART
  const grouped = {};

  data.forEach((t) => {
    const dateObj = new Date(t.date);
    let key;

    if (view === "daily") key = t.date;
    else if (view === "monthly")
      key = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`;
    else key = `${dateObj.getFullYear()}`;

    if (!grouped[key]) {
      grouped[key] = { name: key, income: 0, expense: 0 };
    }

    if (t.type === "Income") grouped[key].income += t.amount;
    else grouped[key].expense += t.amount;
  });

  const lineData = Object.values(grouped);

  // ✅ PIE DATA
  const expenseData = data.filter((t) => t.type === "Expense");

  const categoryMap = {};
  expenseData.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key]
  }));

  // ✅ HIGHEST CATEGORY
  const highest =
    pieData.length > 0
      ? pieData.reduce((a, b) => (a.value > b.value ? a : b))
      : { name: "-", value: 0 };

  return (
    <div className="charts-container">

      {/* ================= LINE CHART ================= */}
      <div className="chart-card">
        <div className="chart-header">
          <h4>📈 Income vs Expense</h4>
        
        <div className="chart-buttons">
  <button 
    className={view === "daily" ? "active" : ""}
    onClick={() => setView("daily")}
  >
    Daily
  </button>

  <button 
    className={view === "monthly" ? "active" : ""}
    onClick={() => setView("monthly")}
  >
    Monthly
  </button>

  <button 
    className={view === "yearly" ? "active" : ""}
    onClick={() => setView("yearly")}
  >
    Yearly
  </button>
</div>
</div>

        

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={lineData}
           margin={{ top: 20, right: 20, left: 0, bottom: 0 }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ================= PIE + INSIGHTS ================= */}
      <div className="chart-card">
        <h4>🥧Spending Breakdown</h4>

        <div className="pie-insights">

          {/* LEFT TEXT */}
          <div className="pie-text">
            <p className="label">👜 Highest spending category</p>
            <h3>{highest.name} at ₹ {highest.value}</h3>

            <p className="label">📊 Total transactions</p>
            <h3>{data.length}</h3>
          </div>

          {/* RIGHT PIE */}
          <div className="pie-chart">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="90%"
                  labelLine={false}
                  label={({ cx, cy, midAngle, outerRadius, percent }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius * 0.6;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#fff"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={14}
                        fontWeight="bold"
                      >
                        {(percent * 100).toFixed(1)}%
                      </text>
                    );
                  }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Charts;