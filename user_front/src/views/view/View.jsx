import "./View.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/app.context";
import { useContext, useState } from "react";
import { Header } from "../../components";

const View = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({ success: false, mail: {} });

  if (!token) {
    navigate("/login");
  }

  const mailData = async () => {
    const response = await axios.get(`/api/mail?id=${id}&token=${token}`);

    const data = response.data;

    if (data.success) {
      setData(data);
    }
  };

  mailData();

  return (
    <div className="view-container">
      <Header />
      {data.success ? (
        <>
          <h2>Tittle: {data.mail.title}</h2>
          <div className="view-span">
            <span>
              From: {data.mail.sender} To: {data.mail.receiver}
            </span>
            <span>Status: {data.mail.read ? "Read" : "Unread"}</span>
            <span>Date: {data.mail.date}</span>
          </div>
          <p>Content: {data.mail.content}</p>
        </>
      ) : (
        <h2>Mail not found</h2>
      )}
    </div>
  );
};

export default View;
