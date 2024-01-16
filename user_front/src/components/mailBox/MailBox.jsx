import "./MailBox.scss";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { Link } from "react-router-dom";

const MailBox = ({ mail }) => {
  const { token } = useContext(AppContext);

  const deleteMail = async () => {
    const response = await axios.delete(`/api/mail/${mail._id}?token=${token}`);
    const data = response.data;

    if (data.success) {
      window.location.reload();
    }
  };

  return (
    <div className="mail-box-container">
      <span>{mail.sender}</span>
      <span>{mail.title}</span>
      <span>
        {mail.date &&
          new Date(mail.date).toLocaleString(undefined, { hour12: false })}
      </span>
      <span>{mail.read ? "Read" : "Unread"}</span>
      <button type="button" onClick={deleteMail}>
        🗑️
      </button>
      <Link to={`/view/${mail._id}`}>👁</Link>
    </div>
  );
};

export default MailBox;
