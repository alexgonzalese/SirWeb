import React from "react";
import LogoPpal from "../../../assets/img/png/logo-white.png";
import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={LogoPpal}
          alt="Sistema de Informacion Recidencial (SIR)"
        />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </Button>
      </div>

      <div className="menu-top__right">
        <Button type="link">
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
