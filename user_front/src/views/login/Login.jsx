import './Login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  const login = async (e) => {
    const form = e.target.parentNode;
    const email = form[0].value;
    const password = form[1].value;

    const userData = { email, password };

    const response = await axios.post('/api/user/login', userData);
    const data = response.data;

    console.log(data);

    if (data.success && data.token) {
      localStorage.setItem('email', email);
      setToken(data.token);
      navigate('/inbox');
    }
  };

  return (
    <div className="login-container">
      <div className="form">
        <h2>Login</h2>
        <form>
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="button" onClick={(e) => login(e)}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
