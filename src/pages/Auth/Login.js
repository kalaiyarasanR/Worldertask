import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return alert("Invalid credentials!");
    login({ email: found.email, name: found.name });
    navigate("/");
  };

  const handleSocial = (provider) => {
    const socialEmail = provider + "_user@example.com";
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!users.find(u => u.email === socialEmail)) {
      users.push({ email: socialEmail, password: "social", name: provider + " User" });
      localStorage.setItem("users", JSON.stringify(users));
    }
    login({ email: socialEmail, name: provider + " User" });
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => handleSocial('google')}>Login with Google</button>
        <button onClick={() => handleSocial('facebook')}>Login with Facebook</button>
        <button onClick={() => handleSocial('apple')}>Login with Apple</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label><br/>
          <input value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>

      <div style={{ marginTop: 12 }}>
        <Link to="/register">Create an account</Link>
      </div>
    </div>
  );
}
