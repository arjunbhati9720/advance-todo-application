import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, SignupPage, TodoPage, WelcomePage } from './pages';

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<WelcomePage />} />
          <Route path={'/todo'} element={< TodoPage/>} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/signup'} element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
