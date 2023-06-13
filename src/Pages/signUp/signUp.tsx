import React from 'react';
import SignupForm from '../../Components/SignUpForm/SignUpForm';
import signUpImage from '../../assets/SignUp_Image.png';
import { Col, Image, Row } from 'antd';
import styles from './signUp.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const SignupPage: React.FC = () => {
     const error=useSelector((state: RootState)=>state.user.error)
    const isError=useSelector((state: RootState)=>state.user.isError)
    return (
        <Row className={styles.container} >
            <Col span={12} xs={24} lg={12} className={styles.FormCol}>
                <SignupForm />
                 {isError &&  <div style={{fontSize:"small", color:"red"}}>{error}</div>}
            </Col>
            <Col span={12} xs={24} lg={12} className={styles.imageCol}>
                <Image src={signUpImage} preview={false}/>
            </Col>
        </Row>
    )
};

export default SignupPage;
