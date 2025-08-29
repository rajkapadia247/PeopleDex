import { useState, type FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import api from "../../../helpers/axios";
import Footer from "../../molecules/Footer/Footer";
import Logo from "../../atoms/Logo/Logo";
import GoogleSignInButton from "../../atoms/GoogleSignInButton/GoogleSignInButton";
import "../shared/auth.css";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }

    if (error) setError("");
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (form.password && value !== form.password)
          return "Passwords do not match";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const errors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      password: validateField("password", form.password),
      confirmPassword: validateField("confirmPassword", form.confirmPassword),
    };

    setFieldErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { confirmPassword, ...submitData } = form;
      const res = await api.post("/auth/register", submitData);
      login(res.data.userData);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || `Failed to create account`);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordsMatch = Boolean(
    form.password &&
      form.confirmPassword &&
      form.password === form.confirmPassword
  );
  const passwordsDontMatch = Boolean(
    form.confirmPassword && form.password !== form.confirmPassword
  );

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
            <h1 className="auth-title">Sign Up</h1>

            {error && <div className="alert">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-container">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    autoFocus
                    placeholder="Your full name"
                    className={`form-input ${fieldErrors.name ? "error" : ""}`}
                  />
                </div>
                {fieldErrors.name && (
                  <span className="form-error">{fieldErrors.name}</span>
                )}
              </div>

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
                    placeholder="Your email address"
                    className={`form-input ${fieldErrors.email ? "error" : ""}`}
                  />
                </div>
                {fieldErrors.email && (
                  <span className="form-error">{fieldErrors.email}</span>
                )}
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
                    autoComplete="new-password"
                    placeholder="Your password"
                    className={`form-input form-input-with-icon ${
                      fieldErrors.password ? "error" : ""
                    }`}
                  />
                  <div onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <ion-icon
                        name="eye-off-outline"
                        className="input-icon-right"
                      />
                    ) : (
                      <ion-icon
                        name="eye-outline"
                        className="input-icon-right"
                      />
                    )}
                  </div>
                </div>
                {fieldErrors.password && (
                  <span className="form-error">{fieldErrors.password}</span>
                )}
              </div>

              <div className="form-group">
                <div className="input-container">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    className={`form-input form-input-with-match-icons ${
                      fieldErrors.confirmPassword ? "error" : ""
                    }`}
                  />
                  <div className="password-match-icons">
                    {form.confirmPassword && (
                      <>
                        {passwordsMatch ? (
                          <ion-icon
                            name="checkmark-circle-outline"
                            className="match-icon success"
                          />
                        ) : passwordsDontMatch ? (
                          <ion-icon
                            name="close-circle-outline"
                            className="match-icon error"
                          />
                        ) : null}
                      </>
                    )}
                    <div onClick={toggleConfirmPasswordVisibility}>
                      <ion-icon
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        className="input-icon-right"
                      />
                    </div>
                  </div>
                </div>
                {fieldErrors.confirmPassword && (
                  <span className="form-error">
                    {fieldErrors.confirmPassword}
                  </span>
                )}
              </div>

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
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
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Sign in
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

export default Register;
