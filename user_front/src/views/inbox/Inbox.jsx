import "./Inbox.scss";
import { MailBox, Header } from "../../components";
import { AppContext } from "../../context/app.context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const Inbox = () => {
  const { token } = useContext(AppContext);
  const [data, setData] = useState({ success: false, mail: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/mail?token=${token}`);

      const data = response.data;

      if (data.success) {
        setData(data);
      }
    };

    fetchData();
  }, [setData, token]);

  return (
    <div className="inbox-container">
      <Header />
      {data.success ? (
        data.mail.map((email) => <MailBox key={email._id} mail={email} />)
      ) : (
        <h2>Empty inbox</h2>
      )}
    </div>
  );
};

export default Inbox;
