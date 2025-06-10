import { useState, type FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import api from "../../../api/axios";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/login", form);
      login(res.data);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <h2>Sign in</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="your@email.com"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="••••••"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign in</button>
      </form>
      <p>
        <Link to="/login">Forgot your password?</Link>
      </p>
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
