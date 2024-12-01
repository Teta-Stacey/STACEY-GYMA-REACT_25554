import React, { useState, useEffect } from "react";
import "../styles/edit-profile-page.scss";
import { API_URL, logout } from "../utils/constants";
import { useParams } from "react-router-dom";
import useAuthRedirect from "../utils/useAuthRedirect";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const ProfileEditPage: React.FC = () => {
  useAuthRedirect(true);
  const [user, setUser] = useState<User | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(API_URL + "/users/" + id)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch(() => setErrorMessage("User not found"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (submitting) return;
    setErrorMessage("");

    if (user) {
      setSubmitting(true);
      fetch(API_URL + `/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setMessage("Your profile has been updated successfully!");
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("Failed to update profile");
        })
        .finally(() => setSubmitting(false));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      const { name, value } = e.target;
      setUser((prevUser) => ({ ...prevUser!, [name]: value }));
    }
  };

  return (
    <div className="edit-profile-page">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://via.placeholder.com/50"
              width="40"
              height="40"
              alt="STACEY GYM"
            />
            STACEY GYM
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="languageDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {navigator.language === "en"
                  ? "English"
                  : navigator.language === "rw"
                  ? "Kinyarwanda"
                  : "Français"}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="languageDropdown"
              >
                <li>
                  <a className="dropdown-item" href="?lang=en">
                    English
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="?lang=rw">
                    Kinyarwanda
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="?lang=fr">
                    Français
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">Edit Profile</h3>
              </div>
              {message && <div className="alert alert-success">{message}</div>}
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              {loading && (
                <div className="d-flex justify-content-center my-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <div className="card-body">
                {user && !errorMessage && (
                  <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={user.id} />
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter first name"
                        value={user.firstName}
                        onChange={handleChange}
                        type="text"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter last name"
                        value={user.lastName}
                        onChange={handleChange}
                        type="text"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        value={user.email}
                        readOnly
                        type="email"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label">
                        Phone Number
                      </label>
                      <input
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        type="text"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="dateOfBirth" className="form-label">
                        Date of Birth
                      </label>
                      <input
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={user.dateOfBirth}
                        onChange={handleChange}
                        type="date"
                      />
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-primary" type="submit">
                        {submitting ? "Updating..." : "Update Profile"}
                      </button>
                      <a href="/profile" className="btn btn-secondary">
                        Cancel
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;