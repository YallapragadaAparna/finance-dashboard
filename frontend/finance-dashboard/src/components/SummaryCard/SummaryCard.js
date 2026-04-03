// import React from "react";
// import "./SummaryCard.css";
// import { ArrowUp, ArrowDown, Wallet } from "lucide-react";

// function SummaryCard({ title, amount,className }) {
//   const getIcon = () => {
//     if (title === "Income") return <ArrowUp className="icon income-icon" />;
//     if (title === "Expenses") return <ArrowDown className="icon expense-icon" />;
//     return <Wallet className="icon balance-icon" />;
//   };

//   return (
//     <div className="summary-card">
//       <div className="card-header">
        
//         {getIcon()}
//         <h3>{title}</h3>
//       </div>
//       <h2>₹ {amount}</h2>
//     </div>
//   );
// }
// export default SummaryCard;
import React from "react";
import "./SummaryCard.css";
import { ArrowUp, ArrowDown, Wallet } from "lucide-react";

function SummaryCard({ title, amount, className }) {

  const getIcon = () => {
    if (title === "Income") return <ArrowUp className="icon income-icon" />;
    if (title === "Expenses") return <ArrowDown className="icon expense-icon" />;
    return <Wallet className="icon balance-icon" />;
  };

  return (
    <div className={`summary-card ${className}`}>
      <div className="card-header">
        {getIcon()}
        <h3>{title}</h3>
      </div>

      <h2>₹ {amount.toLocaleString()}</h2>
    </div>
  );
}

export default SummaryCard;