import { useLocation, useNavigate } from "react-router-dom";
import "./SideMenu.css";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ul className="side-menu">
      <li className="menu-header">Hash</li>
      <li
        className={location.pathname === "/sha1" ? "active" : ""}
        onClick={() => navigate("/sha1")}
      >
        SHA1
      </li>
      <li
        className={location.pathname === "/sha256" ? "active" : ""}
        onClick={() => navigate("/sha256")}
      >
        SHA256
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
    </ul>
  );
};

export default SideMenu;
