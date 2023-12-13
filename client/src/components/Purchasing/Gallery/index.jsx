import React, { useState } from "react";

import Footer from "../../Footer";
import { LiaUserSolid, IoMdSettings, RxActivityLog, RiLogoutCircleRLine } from "../../react-icon";
import ContentGallery from "./ContentGallery";
import CartBar from "./CartBar";
import AddTocartModal from "./AddTocartModal";

const MainGallery = () => {
  const [dataCart, setDataCart] = useState([]);
  const [dataCartTemp, setDataCartTemp] = useState([]);
  const [qtStat, setQtyStat] = useState(false);

  const [dataCartName, setDataCartName] = useState("");
  const [qtyValue, setQtyValue] = useState(1);

  const setChartHandle = (data) => {
    // Mengumpulkan data dan membungkusnya menjadi object, agar bbisa masuk diarray

    setQtyValue(1);
    setDataCartTemp(data);
    setQtyStat(false);
  };

  // const setChartHandle = (data) => {
  //   // Mengumpulkan data dan membungkusnya menjadi object, agar bbisa masuk diarray

  //   setQtyValue(1);
  //   // Mencari data yang sama
  //   const dataNama = dataCart.find((e) => {
  //     return e.data.stock.stock_name === data.stock.stock_name;
  //   });

  //   // jika data nama didalm cart ada yang sama
  //   if (dataNama) {
  //     // Mencari Index
  //     const index = dataCart.findIndex((value) => value.data.stock.stock_name === data.stock.stock_name);
  //     dataCart[index].QtyProd = qtyValue;
  //     setDataCartName(data.stock.stock_name);
  //     // dataCart[index].QtyProd = 1;
  //     console.log({ dataNama }, "Data Sudah Ada, Tidak di tambahkan");
  //     return;
  //   }

  //   // Jika data Kosong
  //   // atau data dengan nama yang sama tidak ada maka tambahkan data baru
  //   console.log("Nama Kosong!");
  //   const newData = { data, QtyProd: qtyValue };
  //   setDataCart((dataCart) => [...dataCart, newData]); // Push Data
  //   setDataCartName(data.stock.stock_name);
  //   // dataCart[index].QtyProd = 1;
  //   console.log("Data Baru Ditambahkan");
  // };

  const printConsole = () => {
    console.log({ dataCart });
  };

  // Hapus Cart
  const cartHandle = (index) => {
    // const newDatacart = dataCart.filter((e, i) => {
    //   console.log({ i });
    //   return i !== index;
    // });
    // setDataCart(newDatacart);
    // console.log({ newDatacart });
    const newCart = [...dataCart];
    newCart.splice(index, 1);
    setDataCart(newCart);
  };

  // cartHandle(setChartHandle);

  return (
    <div>
      <div id="wrapper">
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light topbar mb-4 static-top shadow" style={{ backgroundColor: "#ffff" }}>
              <a href="/">
                <img src={require("../../../photos/logo2.png")} className="ms-3" alt="" style={{ width: "90px" }} />
              </a>
              {/* Topbar Navbar */}
              <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block" />
                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                    <img className="img-profile rounded-circle" src="img/undraw_profile.svg" />
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

            {/* Button Test Print */}
            <button onClick={printConsole} class="buttonClear mt-2" style={{ border: "0.5px solid grey ", width: "2rem", height: "2rem", borderRadius: "5px" }}>
              test
            </button>

            {/* Content */}
            <ContentGallery dataCart={dataCart} setChartHandle={setChartHandle} />
            {/* End Content */}

            {/* CartBar */}
            <CartBar qtStat={qtStat} dataCart={dataCart} cartHandle={cartHandle} qtyValue={qtyValue} />
          </div>
          <Footer />
          <AddTocartModal setQtyStat={setQtyStat} setDataCart={setDataCart} dataCartTemp={dataCartTemp} qtyValue={qtyValue} setQtyValue={setQtyValue} dataCart={dataCart} dataCartName={dataCartName} />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </div>
  );
};

export default MainGallery;
