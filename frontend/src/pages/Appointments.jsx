import React, { useState } from "react";

function Appointments() {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  const appointmentData = {
    name: formData.patientName,
    email: formData.email,
    doctor: formData.doctorName,
    date: formData.date,
    time: formData.time
  };

  try {

    const response = await fetch("http://localhost:3000/book-appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appointmentData)
    });

    const result = await response.json();

    alert(result.message);

  } catch (error) {
    console.error(error);
    alert("Error booking appointment");
  }
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
          <input
  type="email"
  name="email"
  placeholder="Patient Email"
  value={formData.email || ""}
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
