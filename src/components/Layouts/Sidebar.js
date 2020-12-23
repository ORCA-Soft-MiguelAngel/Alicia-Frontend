import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import bg_1 from "../../images/sidebar/bg-1.jpeg";
import { MdAccountBalanceWallet, MdSupervisorAccount } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { AiFillDollarCircle, AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = ({
  //state of the sidebar
  openSidebar = false,
}) => {
  //STATES
  //state to prevent the ugly sidebar text render when opens
  const [textRender, setTextRender] = useState(false);

  //EEFECTS
  //when you open the side bar, prevent ugly text render
  useEffect(() => {
    if (openSidebar) {
      setTimeout(() => {
        setTextRender(true);
      }, 200);
    } else {
      setTextRender(false);
    }
  }, [openSidebar]);

  return (
    <div id="_sidebar-wrapper" className="">
      {/**CONTABILIDAD */}
      <div className={` ${openSidebar ? "p-3" : "p-2"} _zindex-max`}>
        {openSidebar && <h5 class="_app-sidebar-heading">GENERAL</h5>}
        <ListGroup variant="flush" className="_font-size-088 _sidebar-group">
          <ListGroup.Item
            action
            className="_sidebar-item text-light"
            variant="light"
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/dashboard"
            >
              <AiFillHome size={25} color="rgba(255,255,255,0.7)" />
              {textRender && <span className="ml-2">Home</span>}
            </Link>
          </ListGroup.Item>
          {!openSidebar && <hr className="border w-100" />}
          {openSidebar && <h5 class="_app-sidebar-heading">CONTABILIDAD</h5>}
          <ListGroup.Item
            action
            className="_sidebar-item text-light"
            variant="light"
            active
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/accounting/charts"
            >
              <MdSupervisorAccount size={25} color="rgba(255,255,255,0.7)" />
              {textRender && <span className="ml-2">Catalogo de cuentas</span>}
            </Link>
          </ListGroup.Item>
          <ListGroup.Item action className="_sidebar-item text-light">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/accounting/records"
            >
              <FaClipboardList size={25} color="rgba(255,255,255,0.7)" />
              {textRender && <span className="ml-2">Registros</span>}
            </Link>
          </ListGroup.Item>
          <ListGroup.Item action className="_sidebar-item text-light">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/accounting/balance"
            >
              <MdAccountBalanceWallet size={25} color="rgba(255,255,255,0.7)" />
              {textRender && <span className="ml-2">Balances</span>}
            </Link>
          </ListGroup.Item>
          <ListGroup.Item action className="_sidebar-item text-light">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/accounting/movement"
            >
              <AiFillDollarCircle size={25} color="rgba(255,255,255,0.7)" />
              {textRender && <span className="ml-2">Movimiento contable</span>}
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </div>

      <div
        class="_app-sidebar-bg _opacity-06"
        style={{
          backgroundImage: `url(${bg_1})`,
        }}
      ></div>
    </div>
  );
};

export default Sidebar;
