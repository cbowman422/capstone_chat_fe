import React from 'react'
import {useState} from 'react'
import  {useNavigate, Link} from 'react-router-dom'
import '../../css/LoginForm.css'

const LoginForm = ({login}) => {

  // definining the initial state as an object of username and password with empty strings
  const initialState = { username: "", password: ""}

  // defining the state of the input and setting it to initial state username/pw
  const [input, setInput] = useState(initialState)

  // useNavigate returns an imperative method that you can use for changing location.
	const navigate = useNavigate()

  // event handler for submitted login
  const handleSubmit = async (e) => {
  
  // Clicking on a "Submit" button, this prevents it from submitting a form
    e.preventDefault()

  // gets user token from login userInput from App.js component
    const createdUserToken = await login(input)

    if (createdUserToken) {
      navigate("/rooms")
    } else {
      navigate("/login/")
    }

    // set state as new username and password on submit
		setInput(initialState);
  };

// save new state with password and value on event change
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

// Login Form JSX and export
  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Name: </label>
        <input
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
          maxLength="17"
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          type="password"
        />
        <br />
        <br />
        <input type="submit" value="login" />
      </form>
      <Link to={'/'} >
      <h2> Need to Register? </h2>
      </Link>
    </div>
  );
};

export default LoginForm;
