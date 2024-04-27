import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Grid, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { teal,pink, grey} from '@mui/material/colors';



const Todo = () => {
    const [toggle, setToggle] = useState(false);
    const [id, setId] = useState(1);
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('')
    const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('login-user')));
    const [checkUpdateTask, setCheckUpdateTask] = useState(false);
    useEffect(() => {
        setEmail(loginUser.email)
        setId(JSON.parse(localStorage.getItem('login-user')).todos.length + 1)
    }, [loginUser, toggle])
    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && startTime && endTime && description) {
            const currentUser = JSON.parse(localStorage.getItem('login-user'));

            if (checkUpdateTask) {
                if (currentUser && currentUser.todos) {
                    const updatedTodos = currentUser.todos.map((todo) => {
                        if (todo.id === id) {
                            return {
                                ...todo,
                                title,
                                startTime,
                                endTime,
                                description
                            };
                        } else {
                            return todo;
                        }
                    });

                    const updatedUser = {
                        ...currentUser,
                        todos: updatedTodos
                    };

                    setLoginUser(updatedUser);
                    setCheckUpdateTask(false)
                    localStorage.setItem('login-user', JSON.stringify(updatedUser));
                }
            } else {
                // Add new todo
                const newTodo = {
                    id,
                    title,
                    email,
                    startTime,
                    endTime,
                    description
                };

                if (currentUser && currentUser.todos) {
                    const updatedUser = {
                        ...currentUser,
                        todos: [...currentUser.todos, newTodo]
                    };

                    setLoginUser(updatedUser);
                    localStorage.setItem('login-user', JSON.stringify(updatedUser));
                }
            }

            // Clear form fields
            setTitle('');
            setStartTime('');
            setEndTime('');
            setDescription('');
        }
    };

    const handleDelete = (id) => {
        let user = JSON.parse(localStorage.getItem('login-user'))
        if (user) {
            user.todos.splice(id - 1, 1)
            localStorage.setItem(`login-user`, JSON.stringify(user))
            let signup_user = JSON.parse(localStorage.getItem(`signup-user-${email}`))
            let dataToStore = JSON.parse(localStorage.getItem('login-user')).todos;
        }
        if (user.todos.length > 0) {
            setId(user.todos[user.todos.length - 1]?.id + 1)
        }
        setToggle(!toggle)
    }

    const navigate = useNavigate()
    const logout = (e) => {
        e.preventDefault();
        let signup_user = JSON.parse(localStorage.getItem(`signup-user-${email}`))
        let dataToStore = JSON.parse(localStorage.getItem('login-user')).todos;
        if (signup_user) {
            signup_user.todos = dataToStore
            localStorage.setItem(`signup-user-${email}`, JSON.stringify(signup_user))
            localStorage.removeItem('login-user')
        }
        navigate('/')

    }
    const saveTodos = (e) => {
        e.preventDefault();
        let signup_user = JSON.parse(localStorage.getItem(`signup-user-${email}`))
        let dataToStore = JSON.parse(localStorage.getItem('login-user')).todos;
        if (signup_user) {
            signup_user.todos = dataToStore
            localStorage.setItem(`signup-user-${email}`, JSON.stringify(signup_user))
        }
    }
    // const handleUpdateTodo = (index) => {

    //     const selectedTodo = todos[index];
    //     setTodoName(selectedTodo.name);
    //     setTodoDescription(selectedTodo.description);
    //     setTodoEndTime(selectedTodo.endTime);
    //     setTodoID(index +1)
    //     setTrackForUpdate(true);
    //     setSelectedTodoIndex(index);
    //  };
    const handleUpdate = (id) => {
        let userSTodos = JSON.parse(localStorage.getItem('login-user')).todos
        userSTodos.forEach((ele) => {
            if (ele.id == id) {
                setId(ele.id);
                setTitle(ele.title)
                setEmail(ele.email)
                setStartTime(ele.startTime)
                setEndTime(ele.endTime)
                setDescription(ele.description)
            }
        })
        setCheckUpdateTask(true)
    }
    return (
        <div style={{backgroundColor:teal[300],color:"white"}}>
        <Container maxWidth="md" sx={{backgroundColor:teal[300]}}>
            <Typography variant="h2"  align="center" gutterBottom>To-Do App</Typography>
            <Paper style={{ padding: '20px' ,backgroundColor:grey[500],borderRadius:"20px", backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_pgoHuvuMGt_8ovZZra-dq4ZuQCHA3XsBRw&usqp=CAU", backgroundSize: "cover"}} >
                <form onSubmit={handleSubmit} autoComplete="off" >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                style={{color:"white"}}
                                label="Title"
                                value={title}
                                variant="outlined"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Your Email"
                                value={email}
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Start Time"
                                value={startTime}
                                variant="outlined"
                                onChange={(e) => setStartTime(e.target.value)}
                                type="datetime-local"
                                focused
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="End Time"
                                value={endTime}
                                variant="outlined"
                                onChange={(e) => setEndTime(e.target.value)}
                                type="datetime-local"
                                focused
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Description"
                                value={description}
                                variant="outlined"
                                onChange={(e) => setDescription(e.target.value)}
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{display:"flex",justifyContent:"space-evenly"}}>
                            <Button type="submit" variant="contained" color="primary" style={{paddingLeft:"60px",paddingRight:"60px"}}>{checkUpdateTask ? 'Update Todo' : 'Add Todo'}</Button>
                            <Button onClick={saveTodos} variant="contained" color="primary" style={{paddingLeft:"60px",paddingRight:"60px"}}>Save todos</Button>
                            <Button variant="contained" color="primary" onClick={logout} style={{paddingLeft:"60px",paddingRight:"60px"}}>Logout</Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
            <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>Todos</Typography>
            <ul>
                {JSON.parse(localStorage.getItem('login-user')).todos.map((ele) => (
                    <div key={ele.id}>
                        <li >
                            <Typography variant="h6">ID:{ele.id}</Typography>
                            <Typography variant="body1">Title:{ele.title}</Typography>
                            <Typography variant="body1">Email:{ele.email}</Typography>
                            <Typography variant="body1">Start Time:{ele.startTime}</Typography>
                            <Typography variant="body1">End Time:{ele.endTime}</Typography>
                            <Typography variant="body2">Description: {ele.description}</Typography>
                            <button type='submit' variant='contained' color='primary' onClick={() => handleUpdate(ele.id)}>Update</button>
                            <button type='submit' variant='contained' color='primary' onClick={() => handleDelete(ele.id)} >Delete</button>
                        </li>
                    </div>
                ))}
            </ul>
        </Container>
        </div>
    );
};

export default Todo;
