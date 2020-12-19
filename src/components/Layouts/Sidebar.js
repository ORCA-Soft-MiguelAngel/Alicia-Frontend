import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import bg_1 from "../../images/sidebar/bg-1.jpeg";
import { MdAccountBalanceWallet, MdSupervisorAccount } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";

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
        {openSidebar && <h5 class="_app-sidebar-heading">CONTABILIDAD</h5>}
        <ListGroup variant="flush" className="_font-size-088 _sidebar-group">
          <ListGroup.Item
            action
            className="_sidebar-item text-light"
            variant="light"
            active
          >
            <MdSupervisorAccount size={25} color="rgba(255,255,255,0.7)" />
            {textRender && <span className="ml-2">Catalogo de cuentas</span>}
          </ListGroup.Item>
          <ListGroup.Item action className="_sidebar-item text-light">
            <FaClipboardList size={25} color="rgba(255,255,255,0.7)" />
            {textRender && <span className="ml-2">Registros</span>}
          </ListGroup.Item>
          <ListGroup.Item action className="_sidebar-item text-light">
            <MdAccountBalanceWallet size={25} color="rgba(255,255,255,0.7)" />
            {textRender && <span className="ml-2">Balances</span>}
          </ListGroup.Item>
          <ListGroup.Item action className="_sidebar-item text-light">
            <AiFillDollarCircle size={25} color="rgba(255,255,255,0.7)" />
            {textRender && <span className="ml-2">Movimiento contable</span>}
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
