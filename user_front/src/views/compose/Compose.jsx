import "./Compose.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/app.context";
import { useContext, useRef, useState } from "react";
import { Header } from "../../components";

const Compose = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const emailRef = useRef();

  if (!token) {
    return navigate("/login");
  }

  const refreshEmails = async () => {
    const startsWith = emailRef.current.value;
    const response = await axios.get(
      `/api/emails?startsWith=${startsWith}&token=${token}`,
    );

    const data = response.data;

    if (data.success) {
      setEmails(data.emails);
    }
  };

  const sendMail = async (e) => {
    const form = e.target.parentNode;
    const email = form[0].value;
    const title = form[1].value;
    const content = form[2].value;

    const mailData = { receiver: email, title, content };

    const response = await axios.post(`/api/mail?token=${token}`, mailData);
    console.log(response);

    const data = response.data;

    if (data.success) {
      navigate("/inbox");
    }
  };

  return (
    <div className="compose-container">
      <Header />
      <h2>Compose</h2>
      <form>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          ref={emailRef}
          onChange={refreshEmails}
          list="emails"
        />
        <datalist id="emails">
          {emails.map(({ email }) => (
            <option value={email} />
          ))}
        </datalist>
        <label htmlFor="title">Title</label>
        <input name="title" id="title" type="text" />
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" cols="30" rows="10" />
        <button type="button" onClick={(e) => sendMail(e)}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Compose;
