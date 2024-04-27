import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { FormGroup, FormControl } from '@mui/material';
import { teal } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate()
  useEffect(() => {
    if (formData.name) {
      setFormData(prevState => ({
        ...prevState,
        username: formData.name.toLowerCase().replace(/ /g, '_')
      }));
    }
  }, [formData.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Update username if name changes
    if (name === 'name') {
      setFormData(prevState => ({
        ...prevState,
        userName: value.toLowerCase().replace(/ /g, '_')
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, userName, email, password } = formData;
    if (name && userName && email && password) {
      let newUser = {
        name,
        userName, email, password,
        todos: []
      }
      localStorage.setItem(`signup-user-${email}`, JSON.stringify(newUser))
      setFormData({
        name: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      navigate('/login')

    } else {
      window.confirm('Fill all the credentials')
    }
  }


  return (
    <Grid container spacing={2} sx={{ backgroundColor: teal[300], height: '600px' }}>

      <Grid item xs={12}>

        <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ textAlign: "center", fontSize: '50px', fontWeight: 'bold' }}>Sign Up</Typography>
          </Grid>
          <div>
            <FormGroup sx={{ width: '380px',position:'relative', padding: '10px 25px 20px 25px', borderRadius: '20px', alignSelf: 'center', backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_pgoHuvuMGt_8ovZZra-dq4ZuQCHA3XsBRw&usqp=CAU", backgroundSize: "cover" }}>
              <TextField
                // fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                // fullWidth
                label="Username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                disabled

              />
              <TextField
                // fullWidth
                type='email'
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                // fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                // fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
                Sign Up
              </Button>
          <Link style={{position:'absolute',display:'fixed', right:'25%',bottom:0}} to={'/login'}>If already have account go to login</Link>
            </FormGroup>
          </div>
        </FormControl>

      </Grid>

    </Grid>
  );
};

export default Signup;


