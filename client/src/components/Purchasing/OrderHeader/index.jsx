import React from "react";
import Sidebar from "../../Sidebar";
import Footer from "../../Footer";

import { LiaUserSolid, IoMdSettings, RxActivityLog, RiLogoutCircleRLine } from "../../react-icon";

import OrderHeader from "./OrderHeader";
import OrderDetail from "./OrderDetail";
import OrderDetailEdit from "./OrderDetail/OrderDetailEdit";

const Order = ({ Content }) => {
  let ContentShow;

  switch (Content) {
    case "OrderHeader":
      ContentShow = <OrderHeader />;
      break;
    case "OrderDetail":
      ContentShow = <OrderDetail />;
      break;
    case "OrderDetailEdit":
      ContentShow = <OrderDetailEdit />;
      break;

    default:
      break;
  }

  return (
    <div>
      <div id="wrapper">
        {/* Sidebar */}
        <Sidebar />
        {/* End of Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light topbar mb-4 static-top shadow" style={{ backgroundColor: "#363062" }}>
              {/* Topbar Search */}
              {/* <SearchBar /> */}
              {/* Topbar Navbar */}
              <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block" />

                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>
                    <img className="img-profile rounded-circle" src="https://i.pravatar.cc/150?img=12" alt="" />
                  </a>
                  {/* Dropdown - User Information */}
                  <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">
                      <LiaUserSolid />
                      <span className="ms-1">Profile</span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <IoMdSettings />
                      <span className="ms-1">Settings</span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <RxActivityLog />
                      <span className="ms-1">Activity Log</span>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#logoutModal">
                      <RiLogoutCircleRLine />
                      <span className="ms-1">Logout</span>
                    </a>
                  </div>
                </li>
              </ul>
            </nav>

            {/* Content */}

            {ContentShow}
            {/* End Content */}
          </div>

          <Footer />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </div>
  );
};

export default Order;
