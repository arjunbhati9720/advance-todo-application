import React, { useEffect, useState } from 'react';
import { Typography, Button} from '@mui/material';
import '../styles/Intro.css';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
    const [showContent, setShowContent] = useState(false);
    const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem('login-user')))
    const router = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 500);
        setIsLogin(JSON.parse(localStorage.getItem('login-user')))
        return () => clearTimeout(timer);
    }, []);

    const handleNavigate=(e)=>{
        e.preventDefault()
        if(isLogin){
      router('/todo') 
      
    }else{
        router('/login')
    }

}

    return (
        <div className={`intro-container ${showContent ? 'show' : ''}`}>
            <div className={`intro-content ${showContent ? 'show' : ''}`}>
                <Typography variant="h4" gutterBottom className="intro-heading">
                    🚀 Introducing Your Ultimate Todo Application
                </Typography>
                <Typography variant="body1" gutterBottom className="intro-text">
                    Welcome to the future of productivity! Arjun Bhati presents a cutting-edge todo application built entirely in React, without the need for external servers. But that's not all—this app goes above and beyond with enhanced functionalities for authentication and authorization, all powered by local storage.
                </Typography>
                <Typography variant="h5" gutterBottom className="intro-subheading">
                    ✨ Features:
                </Typography>
                <ul className="intro-list">
                    <li className="intro-list-item">
                        <Typography variant="body1">
                            Seamless Todo Management: Effortlessly organize your tasks with a sleek and intuitive interface.
                        </Typography>
                    </li>
                    <li className="intro-list-item">
                        <Typography variant="body1">
                            Authentication: Securely log in to access your personalized todo lists.
                        </Typography>
                    </li>
                    <li className="intro-list-item">
                        <Typography variant="body1">
                            Authorization: Tailor permissions to control who can view and edit specific tasks.
                        </Typography>
                    </li>
                    <li className="intro-list-item">
                        <Typography variant="body1">
                            Local Storage: Enjoy the convenience of storing your data locally, without compromising security.
                        </Typography>
                    </li>
                    <li className="intro-list-item">
                        <Typography variant="body1">
                            Professional Design: Experience productivity in style with a polished user interface adorned with elegant icons.
                        </Typography>
                    </li>
                </ul>
                {/* <Link href={isLogin ? '/todo' : '/login'} > */}
                    <Button variant="contained" color="primary" size="large" onClick={handleNavigate}>
                        🎉 Get Started Today!
                    </Button>
                {/* </Link> */}
            </div>
        </div>
    );
};

export default Intro;
