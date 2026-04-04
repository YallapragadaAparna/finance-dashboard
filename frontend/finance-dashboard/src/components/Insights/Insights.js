// // // import React from "react";
// // // import "./Insights.css";

// // // function Insights({ data }) {
// // //   const expenses = data.filter((t) => t.type === "Expense");

// // //   let highest = "N/A";

// // //   if (expenses.length > 0) {
// // //     const max = expenses.reduce((a, b) =>
// // //       a.amount > b.amount ? a : b
// // //     );
// // //     highest = max.category;
// // //   }

// // //   return (
// // //     <div className="insights">
// // //       <h3>Insights</h3>
// // //       <p>Highest spending category: {highest}</p>
// // //     </div>
// // //   );
// // // }

// // // export default Insights;
// // import React from "react";
// // import "./Insights.css";

// // function Insights({ data }) {
// //   if (data.length === 0) return null;

// //   // Highest expense category
// //   const expenseData = data.filter((t) => t.type === "Expense");

// //   const categoryMap = {};
// //   expenseData.forEach((t) => {
// //     categoryMap[t.category] =
// //       (categoryMap[t.category] || 0) + t.amount;
// //   });

// //   let maxCategory = "";
// //   let maxAmount = 0;

// //   for (let key in categoryMap) {
// //     if (categoryMap[key] > maxAmount) {
// //       maxAmount = categoryMap[key];
// //       maxCategory = key;
// //     }
// //   }

// //   return (
// //     <div className="insights-card">
// //       <h4>Insights</h4>

// //       <p>👜 Highest spending category:</p>
// //       <h3>{maxCategory} ₹ {maxAmount}</h3>

// //       <p>📊 Total transactions:</p>
// //       <h3>{data.length}</h3>
// //     </div>
// //   );
// // }

// // export default Insights;
// import React from "react";
// import "./Insights.css";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";

// function Insights({ data }) {
//   // calculate category totals
//   const categoryMap = {};

//   data.forEach((t) => {
//     if (t.type === "Expense") {
//       categoryMap[t.category] =
//         (categoryMap[t.category] || 0) + t.amount;
//     }
//   });

//   const pieData = Object.keys(categoryMap).map((key) => ({
//     name: key,
//     value: categoryMap[key],
//   }));

//   const highest = pieData.sort((a, b) => b.value - a.value)[0];

//   const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

//   return (
//     <div className="insights-card">
//       <div className="insights-content">
        
//         {/* LEFT TEXT */}
//         <div className="insights-text">
//           <h3>Insights</h3>

//           <p>🔒 Highest spending category:</p>
//           <h4>
//             {highest ? `${highest.name} ₹ ${highest.value}` : "No Data"}
//           </h4>

//           <p>📊 Total transactions:</p>
//           <h4>{data.length}</h4>
//         </div>

//         {/* RIGHT PIE */}
//         <div className="insights-chart">
//           <PieChart width={200} height={200}>
//             <Pie
//               data={pieData}
//               dataKey="value"
//               outerRadius={80}
//               label
//             >
//               {pieData.map((entry, index) => (
//                 <Cell
//                   key={index}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Insights;
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "./Insights.css";

const COLORS = ["#4f46e5", "#22c55e", "#3b82f6"];

function Insights({ data }) {
  const expenses = data.filter((t) => t.type === "Expense");

  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  const chartData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key]
  }));

  const highest = chartData.reduce(
    (max, item) => (item.value > max.value ? item : max),
    { name: "", value: 0 }
  );

  return (
    <div className="insights-card">

      {/* LEFT TEXT */}
      <div className="insights-left">
        <h3>Insights</h3>

        <p>👜 Highest spending category</p>
        <h4>{highest.name} at ₹ {highest.value}</h4>

        <p>📊 Total transactions</p>
        <h4>{data.length}</h4>
      </div>

      {/* RIGHT PIE */}
      <div className="insights-right">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label={({ percent }) =>
                `${(percent * 100).toFixed(1)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Insights;