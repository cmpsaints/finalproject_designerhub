import React from "react";
import { Link } from "react-router-dom";

let ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle mr-1" /> edit profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie mr-1" /> add experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap mr-1" /> add education
      </Link>
    </div>
  );
};

export default ProfileActions;
