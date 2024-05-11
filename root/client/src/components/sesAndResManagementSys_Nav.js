
import { Link } from "react-router-dom";
import React,{ useEffect,useState } from "react";
// Define CSS as const
const navStyle = {
  backgroundColor: "#1c4c74",
  color: "white",
  marginTop: "-5px", // Adjust margin top as needed
  marginLeft: "-2px",
  marginBottom: "10px", // Adjust margin left as needed
};

function Nav() {




  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const getSessionData = () => {
      const userData = sessionStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    };

    const data = getSessionData();
    setUserData(data);

    if (data && data.status === "Ref") {
      const session = document.getElementById("ses");
      
      if (session) session.style.display = "none";

    } else {
      console.log("User data not found in session.");
    }
  }, []);
  const linkStyle = {
    color: "white", // Setting text color to white
  };

  const brandStyle = {
    color: "white", // Setting text color to white
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={navStyle}>
        <div className="container-fluid">
          <a className="navbar-brand" style={brandStyle}>Session And Reservation</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/sesAndResManagement/mainhome" className="nav-link" style={linkStyle}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sesAndResManagement/sessiondetails" className="nav-link" id="ses" style={linkStyle}>
                  Sessions
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sesAndResManagement/reservationdetails" className="nav-link" style={linkStyle}>
                  Reservations
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
