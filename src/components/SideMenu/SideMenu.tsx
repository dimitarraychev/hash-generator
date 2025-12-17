import { useLocation, useNavigate } from "react-router-dom";
import "./SideMenu.css";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ul className="side-menu">
      {/* Hash section */}
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

      <li className="menu-header">Base64/Hex</li>
      <li
        className={location.pathname === "/decode" ? "active" : ""}
        onClick={() => navigate("/decode")}
      >
        Decode
      </li>
      <li
        className={location.pathname === "/encode" ? "active" : ""}
        onClick={() => navigate("/encode")}
      >
        Encode
      </li>
    </ul>
  );
};

export default SideMenu;
