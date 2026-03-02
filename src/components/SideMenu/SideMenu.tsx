import { useLocation, useNavigate } from "react-router-dom";
import "./SideMenu.css";
import logo from "../../assets/logo.svg";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="side-menu">
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="logo-text">Secure Data Tools</h1>
      </div>
      <ul>
        <li className="menu-header">Hash</li>
        <li
          className={location.pathname === "/sha1" ? "active" : ""}
          onClick={() => navigate("/sha1")}
        >
          SHA-1
        </li>
        <li
          className={location.pathname === "/sha256" ? "active" : ""}
          onClick={() => navigate("/sha256")}
        >
          SHA-256
        </li>
        <li
          className={location.pathname === "/sha384" ? "active" : ""}
          onClick={() => navigate("/sha384")}
        >
          SHA-384
        </li>
        <li
          className={location.pathname === "/sha512" ? "active" : ""}
          onClick={() => navigate("/sha512")}
        >
          SHA-512
        </li>

        <li className="menu-header">Encoding</li>
        <li
          className={location.pathname === "/hex" ? "active" : ""}
          onClick={() => navigate("/hex")}
        >
          Hex
        </li>
        <li
          className={location.pathname === "/base64" ? "active" : ""}
          onClick={() => navigate("/base64")}
        >
          Base64
        </li>
        <li
          className={location.pathname === "/url" ? "active" : ""}
          onClick={() => navigate("/url")}
        >
          URL
        </li>

        <li className="menu-header">Generate</li>
        <li
          className={location.pathname === "/key" ? "active" : ""}
          onClick={() => navigate("/key")}
        >
          Key
        </li>

        <li className="menu-header">Crypto</li>
        <li
          className={location.pathname === "/rsa" ? "active" : ""}
          onClick={() => navigate("/rsa")}
        >
          RSA
        </li>

        <li className="menu-header">Format</li>
        <li
          className={location.pathname === "/json" ? "active" : ""}
          onClick={() => navigate("/json")}
        >
          JSON
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
