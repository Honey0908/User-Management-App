import React from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import styles from './Login.module.css'
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
const Login: React.FC = () => {
    const error=useSelector((state: RootState)=>state.user.error)
    const isError=useSelector((state: RootState)=>state.user.isError)
  
    return (
        <div className={styles.loginPgaeContainer}>
            <Title>Login</Title>
            <br />
            <LoginForm />
            {isError &&  <div style={{fontSize:"smaller", color:"red"}}>{error}</div>}
            <span style={{fontSize:"smaller"}}>Do not have account ? </span><Link to="/signup">Sign Up</Link>
        </div>



    )
};

export default Login;
