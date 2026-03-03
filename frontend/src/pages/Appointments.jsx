import React, { useState } from "react";

function Appointments() {
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Appointment Booked Successfully!");
    console.log(formData);
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h1>Appointments</h1>
        <p>Manage your appointments here.</p>

        {/* ✅ FORM IS BACK */}
        <form className="appointment-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            onChange={handleChange}
            required
          />

          <select name="doctorName" onChange={handleChange} required>
            <option value="">Select Doctor</option>
            <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar</option>
            <option value="Dr. Priya Sharma">Dr. Priya Sharma</option>
            <option value="Dr. Amit Verma">Dr. Amit Verma</option>
          </select>

          <input
            type="date"
            name="date"
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            onChange={handleChange}
            required
          />

          <div className="actions">
           
            <button type="submit" className="btn-primary">
              Book Appointment
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Appointments;
