import React from "react";
import Profile from "./Profile";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Add from "./Add";

const Navbar = () => {
  const navigate = useNavigate();
  const [removeCookies] = useCookies();
  const signout = () => {
    removeCookies("Email");
    removeCookies("Token");
    removeCookies("Name");
    //window.location.reload();
    navigate("/");
  };
  return (
    <div className=" container">
      <div
        class="modal fade "
        id="profileModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Your Profile
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Profile />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="addModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add link here
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Add />
            </div>
          </div>
        </div>
      </div>

      <nav class="navbar container-fluid  ">
        <div class="container">
          <a class="navbar-brand text-white" href="#">
            LINKTREE
          </a>
          <button
            class="navbar-toggler toggler-button"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <img
              src="https://pbs.twimg.com/profile_images/1645125138948521985/B2uhDM61_400x400.jpg"
              alt="profile"
            />
          </button>
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                MORE
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#profileModal"
                >
                  Show Profile
                </button>

                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  Add Link
                </button>

                <li class="nav-item">
                  <button className="signout" onClick={signout}>
                    Signout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
