import React, { useState } from "react";
import "../App.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  // Validate single field in real-time
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Full name is required";
        break;

      case "email":
        if (!value) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value))
          error = "Invalid email format";
        break;

      case "phone":
        if (!value) error = "Phone number is required";
        else if (!/^[0-9]+$/.test(value))
          error = "Only numbers allowed";
        else if (value.length !== 10)
          error = "Phone must be 10 digits";
        break;

      case "username":
        if (!value.trim()) error = "Username is required";
        break;

      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6)
          error = "Minimum 6 characters required";
        break;

      case "confirmPassword":
        if (!value) error = "Confirm your password";
        else if (value !== formData.password)
          error = "Passwords do not match";
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Restrict phone to digits only
    if (name === "phone") {
      value = value.replace(/[^0-9]/g, "");
    }

    setFormData({
      ...formData,
      [name]: value
    });

    const error = validateField(name, value);

    setErrors({
      ...errors,
      [name]: error
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
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);
localStorage.setItem("userEmail", formData.email);
localStorage.setItem("userName", formData.name);

alert("Signup successful!");

window.location.href = "/";

    } catch (error) {
      console.error(error);
      alert("Server error. Make sure backend is running.");
    }
  }
};

  return (
    <div className="page-wrapper">
      <div className="card">
        <h1>Sign Up</h1>
        <p>Create your account to manage appointments.</p>

        <form onSubmit={handleSubmit} noValidate className="appointment-form">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            maxLength="10"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "error" : ""}
          />
          {errors.username && <span className="error-text">{errors.username}</span>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <span className="error-text">{errors.confirmPassword}</span>
          )}

          <button type="submit" className="btn-primary">
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}

export default Signup;