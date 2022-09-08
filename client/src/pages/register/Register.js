import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const Register = () => {
  const url = 'http://localhost:8800/api/auth/register'
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
      });
      const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
      
      const navigate = useNavigate()
      const handleClick = async (e) => {
        e.preventDefault();
        
        try {
        const res = await axios.post(url, credentials);
          console.log(res)
          navigate("/login")
        } catch (err) {
          console.log(err)
        }
      };
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="string"
          placeholder="country"
          id="country"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="city"
          placeholder="city"
          id="city"
          onChange={handleChange}
          className="lInput"
        />
        
        
        <button onClick={handleClick} className="lButton">
          Submit
        </button>
        
      </div>
    </div>
  )
}

export default Register