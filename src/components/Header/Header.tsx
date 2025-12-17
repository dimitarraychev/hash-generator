import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/CT_Interactive-logo.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo-wrapper" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="logo" />
        <p className="logo-text">Multi Tool</p>
      </div>
    </header>
  );
};

export default Header;
