import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {

    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const submitForm = (e) => {
    e.preventDefault()
    if (email && password) {
      let checkUser = JSON.parse(localStorage.getItem(`signup-user-${email}`));
      if (checkUser) {
        if (checkUser.email === email && checkUser.password === password) {
          localStorage.setItem(`login-user`, JSON.stringify({
            email: checkUser.email,
            userName: checkUser.userName,
            name: checkUser.name,
            todos: checkUser.todos
          }))
          let isLogin = window.confirm('Login Successful')
          console.log(isLogin, 'this is alert check')
          if (!isLogin) {
            navigate('/login')
          } else {
            navigate('/todo')
          }
        } else {
          window.alert('please check your password')
        }
      } else {
        window.alert('please check your credentials')
      }
    }
  }
  return (

    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: teal[300], width: "100vw", height: "100vh" }} >
      <Typography variant="h4" align="center" gutterBottom sx={{}} >
        Login
      </Typography>
      <form style={{ borderRadius: '30px', backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_pgoHuvuMGt_8ovZZra-dq4ZuQCHA3XsBRw&usqp=CAU", backgroundSize: "cover", width: "500px", height: "auto", padding: "40px 20px", position: 'relative' }}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button onClick={submitForm} variant="contained" color="primary" fullWidth sx={{ marginTop: '40px' }}>
          Login
        </Button>
        <Link style={{ position: 'absolute', bottom: '5%', right: '30%' }} to={'/signup'}>If Don't have account go to signup</Link>
      </form>
    </Container>
  );

};

export default Login;




