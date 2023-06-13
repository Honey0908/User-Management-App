import React, { useEffect } from 'react';
import SignupForm from '../../Components/SignUpForm/SignUpForm';
import signUpImage from '../../assets/SignUp_Image.png';
import { Col, Image, Row } from 'antd';
import styles from './signUp.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { removeError } from '../../store/userSlice';

const SignupPage: React.FC = () => {
    const dispatch=useDispatch();

    /* remove errors if any while loading page for the first time */
    useEffect(()=>{
        dispatch(removeError()); 
    },[])

    const error=useSelector((state: RootState)=>state.user.error);
    const isError=useSelector((state: RootState)=>state.user.isError);

    return (
        <Row className={styles.container} >
            <Col span={12} xs={24} lg={12} className={styles.FormCol}>
                <SignupForm />
                 {isError &&  <div style={{fontSize:"small", color:"red"}}>{error}</div>}
            <span style={{fontSize:"small"}}>Already have an account ? &nbsp;</span><Link to="/login"> Login</Link>
            </Col>
            <Col span={12} xs={24} lg={12} className={styles.imageCol}>
                <Image src={signUpImage} preview={false}/>
            </Col>
        </Row>
    )
};

export default SignupPage;
