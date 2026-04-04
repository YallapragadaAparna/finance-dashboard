// import React, { useState } from "react";
// import "./Transactions.css";

// function Transactions({
//   data,
//   role,
//   filter,
//   setFilter,
//   addTransaction,
//   setTransactions
// }) {
//   const [search, setSearch] = useState("");
//   const [editIndex, setEditIndex] = useState(null);

//   const [form, setForm] = useState({
//     date: "",
//     amount: "",
//     category: "",
//     type: "Income"
//   });

//   // ✅ FILTER
//   const filtered = data
//     .filter((t) =>
//       t.category.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter((t) => (filter === "All" ? true : t.type === filter));

//   // ✅ EXPORT CSV (FIXED)
//   const exportCSV = () => {
//     const rows = [
//       ["Date", "Amount", "Category", "Type"],
//       ...filtered.map((t) => [
//         `="${new Date(t.date).toLocaleDateString("en-GB")}"`, // Excel safe
//         t.amount,
//         t.category,
//         t.type
//       ])
//     ];

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       rows.map((e) => e.join(",")).join("\n");

//     const link = document.createElement("a");
//     link.href = encodeURI(csvContent);
//     link.download = "transactions.csv";
//     link.click();
//   };

//   // ✅ HANDLE INPUT
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ ADD / UPDATE
//   const handleAdd = () => {
//     if (!form.date || !form.amount || !form.category) {
//       alert("Please fill all fields");
//       return;
//     }

//     const newTransaction = {
//       ...form,
//       amount: Number(form.amount)
//     };

//     if (editIndex !== null) {
//       const updated = [...data];
//       updated[editIndex] = newTransaction;
//       setTransactions(updated);
//       setEditIndex(null);
//     } else {
//       addTransaction(newTransaction);
//     }

//     setForm({
//       date: "",
//       amount: "",
//       category: "",
//       type: "Income"
//     });
//   };

//   // ❌ DELETE
//   const handleDelete = (index) => {
//     const updated = data.filter((_, i) => i !== index);
//     setTransactions(updated);
//   };

//   // ✏️ EDIT
//   const handleEdit = (index) => {
//     setForm(data[index]);
//     setEditIndex(index);
//   };

//   return (
//     <div className="transactions">
//       <h3>Transactions</h3>

//       {/* CONTROLS */}
//       <div className="controls">
//         <div className="left-controls">
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option>All</option>
//             <option>Income</option>
//             <option>Expense</option>
//           </select>

//           <input
//             type="text"
//             placeholder="Search category..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* RIGHT SIDE BUTTON */}
//         <button onClick={exportCSV} className="export-btn">
//           ⬇ Export CSV
//         </button>
//       </div>

//       {/* ADMIN FORM */}
//       {role === "Admin" && (
//         <div className="form">
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//           />

//           <input
//             type="number"
//             name="amount"
//             placeholder="Amount"
//             value={form.amount}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="category"
//             placeholder="Category"
//             value={form.category}
//             onChange={handleChange}
//           />

//           <select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//           >
//             <option value="Income">Income</option>
//             <option value="Expense">Expense</option>
//           </select>

//           <button onClick={handleAdd}>
//             {editIndex !== null ? "🔁 Update" : "✚ Add"}
//           </button>
//         </div>
//       )}

//       {/* TABLE */}
//       {filtered.length === 0 ? (
//         <p className="empty">No transactions found</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Amount</th>
//               <th>Category</th>
//               <th>Type</th>
//               {role === "Admin" && <th>Actions</th>}
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((t, i) => (
//               <tr key={i}>
//                 <td>{t.date}</td>
//                 <td>₹ {t.amount}</td>
//                 <td>{t.category}</td>

//                 <td>
//                   <span
//                     className={
//                       t.type === "Income" ? "income" : "expense"
//                     }
//                   >
//                     {t.type}
//                   </span>
//                 </td>

//                 {role === "Admin" && (
//                   <td>
//                     <button onClick={() => handleEdit(i)}>
//                       ✏️ Edit
//                     </button>
//                     <button onClick={() => handleDelete(i)}>
//                       🗑️ Delete
//                     </button>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Transactions;
import React, { useState } from "react";
import "./Transactions.css";

function Transactions({
  data,
  role,
  filter,
  setFilter,
  addTransaction,
  setTransactions
}) {
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "Income"
  });

  // ✅ FILTER
  const filtered = data
    .filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => (filter === "All" ? true : t.type === filter));

  // ✅ EXPORT CSV
  const exportCSV = () => {
    const rows = [
      ["Date", "Amount", "Category", "Type"],
      ...filtered.map((t) => [
        `="${new Date(t.date).toLocaleDateString("en-GB")}"`,
        t.amount,
        t.category,
        t.type
      ])
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "transactions.csv";
    link.click();
  };

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD / UPDATE
  const handleAdd = () => {
    if (!form.date || !form.amount || !form.category) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      ...form,
      amount: Number(form.amount)
    };

    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = newTransaction;
      setTransactions(updated);
      setEditIndex(null);
    } else {
      addTransaction(newTransaction);
    }

    setForm({
      date: "",
      amount: "",
      category: "",
      type: "Income"
    });
  };

  // ❌ DELETE
  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  // ✏️ EDIT
  const handleEdit = (index) => {
    setForm(data[index]);
    setEditIndex(index);
  };

  return (
    <div className="transactions">
      <h3>Transactions</h3>

      {/* CONTROLS */}
      <div className="controls">
        <div className="left-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Income</option>
            <option>Expense</option>
          </select>

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button onClick={exportCSV} className="export-btn">
          ⬇ Export CSV
        </button>
      </div>

      {/* ADMIN FORM */}
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

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <button onClick={handleAdd}>
            {editIndex !== null ? "🔁 Update" : "✚ Add"}
          </button>
        </div>
      )}

      {/* TABLE / EMPTY STATE */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <h4>📭 No Transactions Found</h4>

          {data.length === 0 ? (
            <p>Start by adding your first transaction</p>
          ) : (
            <p>Try changing filters or search</p>
          )}

          {role === "Admin" && data.length === 0 && (
            <button
              onClick={() =>
                document.querySelector(".form input")?.focus()
              }
            >
              ➕ Add Transaction
            </button>
          )}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              {role === "Admin" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.map((t, i) => (
              <tr key={i}>
                <td>{t.date}</td>
                <td>₹ {t.amount}</td>
                <td>{t.category}</td>

                <td>
                  <span
                    className={
                      t.type === "Income" ? "income" : "expense"
                    }
                  >
                    {t.type}
                  </span>
                </td>

                {role === "Admin" && (
                  <td>
                    <button onClick={() => handleEdit(i)}>
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(i)}>
                      🗑️ Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transactions;