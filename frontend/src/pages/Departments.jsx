import "../App.css";

const departments = [
  {
    id: 1,
    name: "Cardiology",
    description: "Heart related treatments",
    doctor: "Dr. Rajesh Kumar"
  },
  {
    id: 2,
    name: "Neurology",
    description: "Brain and nervous system care",
    doctor: "Dr. Priya Sharma"
  },
  {
    id: 3,
    name: "Orthopedics",
    description: "Bone and joint treatments",
    doctor: "Dr. Amit Verma"
  },
  {
    id: 4,
    name: "Pediatrics",
    description: "Child healthcare",
    doctor: "Dr. Neha Kapoor"
  },
  {
    id: 5,
    name: "General Medicine",
    description: "Routine health checkups",
    doctor: "Dr. Arjun Mehta"
  }
];

function Departments() {
  return (
    <div className="page-wrapper">
      <div className="card">
        <h1>Our Departments</h1>

        <div className="department-grid">
          {departments.map((dept) => (
            <div className="department-card" key={dept.id}>
              <h3>{dept.name}</h3>
              <p>{dept.description}</p>
              <p><strong>Head Doctor:</strong> {dept.doctor}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Departments;