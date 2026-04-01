import React, { useState } from "react";
import "./Transactions.css";

function Transactions({ data, role, filter, setFilter, addTransaction }) {
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "Income"
  });

  const filtered = data.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.date || !form.amount || !form.category) {
      alert("Please fill all fields");
      return;
    }

    addTransaction(form);

    // reset form
    setForm({
      date: "",
      amount: "",
      category: "",
      type: "Income"
    });
  };

  return (
    <div className="transactions">
      <h3>Transactions</h3>

      {/* Controls */}
      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          type="text"
          placeholder="Search category..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Admin Form */}
      {role === "Admin" && (
        <div className="form">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <button onClick={handleAdd}>Add</button>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="empty">No transactions found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={i}>
                <td>{t.date}</td>
                <td>₹ {t.amount}</td>
                <td>{t.category}</td>

                <td
                  style={{
                    color: t.type === "Income" ? "green" : "red"
                  }}
                >
                  {t.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transactions;