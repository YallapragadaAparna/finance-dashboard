import React, { useState } from "react";
import "./Dashboard.css";

import Header from "../../Header/Header";
import SummaryCard from "../../SummaryCard/SummaryCard";
import Charts from "../../Charts/Charts";
import Transactions from "../../Transactions/Transactions";



function Dashboard() {
  const [role, setRole] = useState("Viewer");
  const [filter, setFilter] = useState("All");

  const [transactions, setTransactions] = useState([
    { date: "2026-04-01", amount: 500, category: "Food", type: "Expense" },
    { date: "2026-04-02", amount: 2000, category: "Salary", type: "Income" },
    { date: "2026-05-03", amount: 800, category: "Travel", type: "Expense" },
    { date: "2027-05-07", amount:1000,  category:"Rent",type:"Expense"},
    { date: "2027-06-10", amount:1500, category:"Groceries",type:"Income"}
  ]);

  // ✅ Calculations
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((a, b) => a + b.amount, 0);

  // ✅ Add Transaction
  const addTransaction = (newData) => {
    const formattedData = {
      ...newData,
      amount: Number(newData.amount)
    };

    setTransactions([...transactions, formattedData]);
  };

  return (
    <div className="dashboard">

      <Header role={role} setRole={setRole} />

      {/* SUMMARY CARDS */}
      <div className="cards">
        <SummaryCard title="Balance" amount={income - expense} />
        <SummaryCard title="Income" amount={income} />
        <SummaryCard title="Expenses" amount={expense} />
      </div>

      {/* CHART + INSIGHTS */}
      <div className="charts-row">
        <Charts data={transactions} />
        {/* <Insights data={transactions} /> */}
      </div>

      {/* TRANSACTIONS TABLE */}
      <Transactions
        data={transactions}
        role={role}
        filter={filter}
        setFilter={setFilter}
        addTransaction={addTransaction}
        setTransactions={setTransactions}
      />

    </div>
  );
}

export default Dashboard;