import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    if (name === "username" && !value.trim()) {
      error = "Username is required";
    }

    if (name === "password" && !value) {
      error = "Password is required";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.username,
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Login successful!");
          navigate("/");
        } else {
          alert(data.message);
        }

      } catch (error) {
        console.error("Error:", error);
        alert("Server error. Make sure backend is running.");
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h1>Login</h1>
        <p>Enter your credentials to access your account.</p>

        <form onSubmit={handleSubmit} noValidate className="appointment-form">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "error" : ""}
          />
          {errors.username && (
            <span className="error-text">{errors.username}</span>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}

          <button type="submit" className="btn-primary">
            Sign In
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;