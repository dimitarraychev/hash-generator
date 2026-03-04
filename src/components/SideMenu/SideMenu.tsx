import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SideMenu.css";
import logo from "../../assets/logo.svg";
import menuLogo from "../../assets/menu.svg";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      header: "Hash",
      items: [
        { label: "SHA-1", path: "/sha1" },
        { label: "SHA-256", path: "/sha256" },
        { label: "SHA-384", path: "/sha384" },
        { label: "SHA-512", path: "/sha512" },
      ],
    },
    {
      header: "Encoding",
      items: [
        { label: "Hex", path: "/hex" },
        { label: "Base64", path: "/base64" },
        { label: "URL", path: "/url" },
      ],
    },
    { header: "Generate", items: [{ label: "Key", path: "/key" }] },
    { header: "Crypto", items: [{ label: "RSA", path: "/rsa" }] },
    { header: "Format", items: [{ label: "JSON", path: "/json" }] },
  ];

  return (
    <div className={`side-menu ${isCollapsed ? "collapsed" : ""}`}>
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" className="logo" />
        {!isCollapsed && <h1 className="logo-text">Secure Data Tools</h1>}
        <img
          src={menuLogo}
          alt="Menu"
          className="collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      <ul>
        {menuItems.map((section) => (
          <div key={section.header}>
            <li className="menu-header">{section.header}</li>
            {section.items.map((item) => (
              <li
                key={item.path}
                className={location.pathname === item.path ? "active" : ""}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
