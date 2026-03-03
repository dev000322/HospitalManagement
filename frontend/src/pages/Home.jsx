import "../App.css";

function Home() {
  return (
    <div className="page-wrapper content-wrapper">
      <div className="card">
        <h1>Welcome to Hospital Management System</h1>
        <p>
          Our system helps patients book appointments, connect with
          experienced doctors, and manage healthcare efficiently.
        </p>

        <div className="info-section">
          <div>
            <h3>24/7 Emergency</h3>
            <p>Immediate medical support whenever you need it.</p>
          </div>

          <div>
            <h3>Online Appointment</h3>
            <p>Book appointments with specialists in just a few clicks.</p>
          </div>

          <div>
            <h3>Qualified Doctors</h3>
            <p>Experienced and certified professionals across departments.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;