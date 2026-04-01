import React, { useState } from "react";
import "./Dashboard.css";

import Header from "../../Header/Header";
import SummaryCard from "../../SummaryCard/SummaryCard";
import Charts from "../../Charts/Charts";
import Transactions from "../../Transactions/Transactions";
import Insights from "../../Insights/Insights";

function Dashboard() {
  const [role, setRole] = useState("Viewer");
  const [filter, setFilter] = useState("All");

  const [transactions, setTransactions] = useState([
    { date: "2026-04-01", amount: 500, category: "Food", type: "Expense" },
    { date: "2026-04-02", amount: 2000, category: "Salary", type: "Income" },
    { date: "2026-04-03", amount: 800, category: "Travel", type: "Expense" }
  ]);

  // ✅ Filter logic
  const filtered =
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  // ✅ Calculations
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((a, b) => a + b.amount, 0);

  // ✅ FIXED ADD FUNCTION
  const addTransaction = (newData) => {
    const formattedData = {
      ...newData,
      amount: Number(newData.amount) // important
    };

    setTransactions([...transactions, formattedData]);
  };

  return (
    <div className="dashboard">
      <Header role={role} setRole={setRole} />

      <div className="cards">
        <SummaryCard title="Balance" amount={income - expense} />
        <SummaryCard title="Income" amount={income} />
        <SummaryCard title="Expenses" amount={expense} />
      </div>

      {/* <Charts /> */}
      <Charts data={transactions} />

      <Transactions
        data={filtered}
        role={role}
        filter={filter}
        setFilter={setFilter}
        addTransaction={addTransaction}
      />

      <Insights data={transactions} />
    </div>
  );
}

export default Dashboard;