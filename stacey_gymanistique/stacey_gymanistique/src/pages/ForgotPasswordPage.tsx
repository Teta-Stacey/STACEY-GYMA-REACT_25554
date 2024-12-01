import React, { useState } from "react";
import "../styles/forgot-password-page.scss";
import useAuthRedirect from "../utils/useAuthRedirect";

const ForgotPasswordPage: React.FC = () => {
  useAuthRedirect();
  // State for alerts
  const [messageError, setMessageError] = useState<string | null>(null);
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate a backend call
    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    )?.value;

    if (email === "member@staceygymnastique.com") {
      setMessageSuccess("Password reset link sent to your email.");
      setMessageError(null);
    } else {
      setMessageError("Member email not found. Please try again.");
      setMessageSuccess(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
  };

  return (
    <div className="forgot-password-page">
      {/* Gym Equipment Lights */}
      <div className="gym-light gym-light-left"></div>
      <div className="gym-light gym-light-right"></div>

      {/* Chalk Dust Effects */}
      <div className="chalk-dust"></div>
      <div className="chalk-dust"></div>

      {/* Main Container */}
      <div className="main-container">
        <div className="container">
          <div className="row justify-content-center">
            {/* Alerts */}
            {messageError && (
              <div className="col-md-6">
                <div className="alert alert-danger">{messageError}</div>
              </div>
            )}
            {messageSuccess && (
              <div className="col-md-6">
                <div className="alert alert-success">{messageSuccess}</div>
              </div>
            )}

            {/* Main Form Card */}
            <div className="col-md-6">
              <div className="glass-card" onMouseMove={handleMouseMove}>
                <div className="card-glow"></div>
                <div className="logo-section">
                  <img
                    src="/stacey-gymnastique-logo.png"
                    alt="Stacey Gymnastique Logo"
                  />
                </div>
                <h1 className="title">Recover Gym Account</h1>
                <p className="subtitle">Member Password Reset</p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Membership Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your registered email"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-reset w-100">
                    Reset Password
                  </button>

                  <div className="back-link">
                    <a href="/login">Back to Login</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;