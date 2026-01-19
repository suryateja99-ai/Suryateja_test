import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    special: false,
  });

  const validatePassword = (password) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordRules(validatePassword(value));
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid =
      passwordRules.length &&
      passwordRules.uppercase &&
      passwordRules.special;

    if (!isValid) {
      setError("Password does not meet requirements");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/register", form);

      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email already exists");
      } else {
        setError("Registration failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-form">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="password-sec">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={togglePassword}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <ul className="rules">
          <li className={passwordRules.length ? "ok" : "bad"}>
            Minimum 8 characters
          </li>
          <li className={passwordRules.uppercase ? "ok" : "bad"}>
            At least one uppercase letter
          </li>
          <li className={passwordRules.special ? "ok" : "bad"}>
            At least one special character
          </li>
        </ul>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p>
        Already registered?{" "}
        <button type="button" onClick={() => navigate("/login")}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
