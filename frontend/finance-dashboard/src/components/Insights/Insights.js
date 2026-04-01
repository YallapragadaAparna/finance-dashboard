import React from "react";
import "./Insights.css";

function Insights({ data }) {
  const expenses = data.filter((t) => t.type === "Expense");

  let highest = "N/A";

  if (expenses.length > 0) {
    const max = expenses.reduce((a, b) =>
      a.amount > b.amount ? a : b
    );
    highest = max.category;
  }

  return (
    <div className="insights">
      <h3>Insights</h3>
      <p>Highest spending category: {highest}</p>
    </div>
  );
}

export default Insights;