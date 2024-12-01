import { useState } from "react";
import "../styles/dashboard-page.scss";
import { API_URL, logout } from "../utils/constants";
import useAuthRedirect from "../utils/useAuthRedirect";

const DashboardPage = () => {
  const { user } = useAuthRedirect(true);

  const [uploading, setUploading] = useState(false);

  if (!user) return null;
  return (
    <div className="dashboard-page">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="ass.jpg"
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
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/members">
                  <i className="fas fa-users me-2"></i>Members
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout" onClick={logout}>
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="languageDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-globe me-2"></i> English
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
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
        </div>
      </nav>

      <div className="container my-5">
        <div className="row gy-4">
          <div className="col-md-4">
            <div className="card bg-light shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <i className="fas fa-users fa-3x text-primary"></i>
                  </div>
                  <div>
                    <h5 className="card-title">Total Members</h5>
                    <h3 className="card-text">450</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-light shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <i className="fas fa-dumbbell fa-3x text-primary"></i>
                  </div>
                  <div>
                    <h5 className="card-title">Classes Offered</h5>
                    <h3 className="card-text">20</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-light shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <i className="fas fa-trophy fa-3x text-primary"></i>
                  </div>
                  <div>
                    <h5 className="card-title">Gym Rank</h5>
                    <h3 className="card-text">1st</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4>
                  <i className="fas fa-user-circle me-2"></i>Member Information
                </h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <div className="text-muted">Name</div>
                      <div>{user.firstName} {user.lastName}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-muted">Email</div>
                      <div>{user.email}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-muted">Role</div>
                      <div>{user.roles[0].name}</div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    {user.profilePicture ? (
                      <div className="profile-picture-card mx-auto">
                        <img
                          src={
                            API_URL +
                            "/download-profile?fileName=" +
                            user.profilePicture
                          }
                          className="card-img-top"
                          alt="Profile Picture"
                        />
                        <div className="card-body text-center">
                          <a
                            href={
                              API_URL +
                              "/download-profile?fileName=" +
                              user.profilePicture
                            }
                            className="btn btn-primary"
                            download={user.firstName + " " + user.lastName}
                          >
                            <i className="fas fa-download me-2"></i>Download
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="profile-picture-card mx-auto">
                        <img
                          src="https://via.placeholder.com/250"
                          className="card-img-top"
                          alt="Profile Picture"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="upload-form mt-4">
                  <form
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={(e: any) => {
                      e.preventDefault();
                      if (uploading) return;

                      const formData: any = new FormData();
                      const profilePicture = e.target.profilePicture.files[0];
                      if (!profilePicture) return;
                      formData.append("profilePicture", profilePicture);
                      formData.append("userId", user.id);

                      setUploading(true);

                      fetch(API_URL + "/uploadProfilePicture", {
                        method: "POST",
                        body: formData,
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.success) {
                            // Get user from localStorage and update profilePic
                            const localUSer = localStorage.getItem("user");
                            if (!localUSer) {
                              window.location.reload();
                              return;
                            }

                            const user = JSON.parse(localUSer);
                            user.profilePicture = data.profilePicture;
                            localStorage.setItem("user", JSON.stringify(user));

                            //
                            alert("Profile picture uploaded successfully");
                            window.location.reload();
                          } else {
                            alert("Failed to upload profile picture");
                          }
                        })
                        .catch((err) => {
                          console.error(err);
                          alert("Failed to upload profile picture");
                        })
                        .finally(() => {
                          setUploading(false);
                        });
                    }}
                  >
                    <div className="mb-3">
                      <label htmlFor="profilePicture" className="form-label">
                        <i className="fas fa-upload me-2"></i>Upload New Profile
                        Picture
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        accept="image/*"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-cloud-upload-alt me-2"></i>
                      {uploading ? "Uploading..." : "Upload"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;