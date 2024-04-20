import React from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/mainhome" class="nav-link">
                  Home
                </Link>
              </li>
              {/* <li class="nav-item">
                <Link to="/addsession" class="nav-link">
                  Add Session
                </Link>
              </li> */}
              {/* <li class="nav-item">
                <Link to="/addreservation" class="nav-link">
                  Add Reservation
                </Link>
              </li> */}
              <li class="nav-item">
                <Link to="/sessiondetails" class="nav-link">
                  Sessions
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/reservationdetails" class="nav-link">
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