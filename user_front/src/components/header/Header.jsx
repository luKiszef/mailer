import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/app.context";
import { useContext } from "react";

const Header = () => {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const logout = () => {
    setToken(null);
    navigate("/login");
  };

  const refresh = () => {
    window.location.reload(true);
  };
  return (
    <div className="header-container">
      <h1>Mailer</h1>
      <span>{email}</span>
      <button onClick={logout}>Logout</button>
      <button onClick={() => navigate("/inbox")}>Inbox</button>
      <button onClick={() => navigate("/compose")}>Compose</button>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};

export default Header;
