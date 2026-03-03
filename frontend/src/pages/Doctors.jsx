import React from "react";
import "../App.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialization: "Cardiologist",
    experience: "10 Years",
    phone: "9876543210"
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialization: "Neurologist",
    experience: "8 Years",
    phone: "9123456780"
  },
  {
    id: 3,
    name: "Dr. Amit Verma",
    specialization: "Orthopedic",
    experience: "12 Years",
    phone: "9988776655"
  },
  {
    id: 4,
    name: "Dr. Neha Kapoor",
    specialization: "Pediatrician",
    experience: "7 Years",
    phone: "9090909090"
  },
  {
    id: 5,
    name: "Dr. Arjun Mehta",
    specialization: "General Physician",
    experience: "15 Years",
    phone: "9012345678"
  },
  {
    id: 6,
    name: "Dr. Kavita Rao",
    specialization: "Dermatologist",
    experience: "9 Years",
    phone: "9876501234"
  }
];

function Doctors() {
  return (
  <div className="page-wrapper">
    <div className="card">
      <h1>Our Doctors</h1>

      <div className="doctor-grid">
        {doctors.map((doc) => (
          <div className="doctor-card" key={doc.id}>
            <h3>{doc.name}</h3>
            <p><strong>Specialization:</strong> {doc.specialization}</p>
            <p><strong>Experience:</strong> {doc.experience}</p>
            <p><strong>Contact:</strong> {doc.phone}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Doctors;