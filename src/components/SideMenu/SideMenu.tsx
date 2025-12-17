import { useNavigate } from "react-router-dom";
import "./SideMenu.css";

const SideMenu = () => {
  const navigate = useNavigate();

  return (
    <ul className="side-menu">
      <li onClick={() => navigate("/sha1")}>SHA1</li>
      <li onClick={() => navigate("/sha256")}>SHA256</li>
    </ul>
  );
};
export default SideMenu;
