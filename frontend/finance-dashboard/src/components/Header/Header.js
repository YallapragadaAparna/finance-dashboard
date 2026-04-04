// import React from "react";
// import "./Header.css";

// function Header({ role, setRole }) {
//   return (
//     <div className="header">
//       <div className="header-left">
//         <h2 className="logo">💰 Finance Dashboard</h2>
//       </div>

//       <div className="header-right">
//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="role-select"
//         >
//           <option value="Viewer">Viewer</option>
//           <option value="Admin">Admin</option>
//         </select>

//         <div className="profile">
//           <span className="avatar">👤</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;
import React, { useState } from "react";
import "./Header.css";

function Header({ role, setRole }) {

  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="header">
      <div className="header-left">
        <h2 className="logo">💰 Finance Dashboard</h2>
      </div>

      <div className="header-right">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="role-select"
        >
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>

        <div className="profile">
          <span className="avatar">👤</span>
        </div>

        <button onClick={toggleDarkMode}>{dark ? "☀️" : "🌙"}</button>
      </div>
    </div>
  );
}

export default Header;