import React from "react";
import "./SummaryCard.css";

function SummaryCard({ title, amount }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p>₹ {amount}</p>
    </div>
  );
}

export default SummaryCard;