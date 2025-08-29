import { useState, type FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import api from "../../../helpers/axios";
import Footer from "../../molecules/Footer/Footer";
import Logo from "../../atoms/Logo/Logo";
import GoogleSignInButton from "../../atoms/GoogleSignInButton/GoogleSignInButton";
import "../shared/auth.css";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-branding">
          <Logo
            size="xl"
            variant="transparent"
            className="auth-logo auth-logo-xl"
          />
          <p className="auth-tagline">
            Connect and organize your network with ease. Manage contacts,
            relationships, and never lose touch with the people who matter.
          </p>
        </div>
        <div className="auth-form-container">
          <div className="auth-card">
            <h1 className="auth-title">Sign In</h1>

            {error && <div className="alert">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-container">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    autoFocus
                    placeholder="Your email address"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    placeholder="Your password"
                    className="form-input form-input-with-icon"
                  />
                  {showPassword ? (
                    <ion-icon
                      name="eye-off-outline"
                      className="input-icon-right"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <ion-icon
                      name="eye-outline"
                      className="input-icon-right"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>
            <GoogleSignInButton
              onSignedIn={(userData) => {
                login(userData);
                navigate("/");
              }}
            />

            <div className="auth-links">
              <p className="auth-text">
                <Link to="/forgot-password" className="auth-link">
                  Forgot your password?
                </Link>
              </p>
              <p className="auth-text">
                Don't have an account?{" "}
                <Link to="/register" className="auth-link">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
