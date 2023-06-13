import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { resetUser } from '../../store/userSlice';
import styles from './HomePage.module.css'
import { Button } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user!);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetUser());
  };

  return (
    <>
      <div className={styles.homePageContainer}>

        <div className={styles.homePageHeading}>

          <h1>Welcome {user.name} !</h1>
          <Button onClick={handleLogout} type='default'>Logout</Button>

        </div>
        <div className={styles.userInfoCard}>

          <div className={styles.userImage}>
            {user.image && (
              <img src={user.image} alt="Profile Picture" height="100%" width="100%" />
            )}
          </div>

          <div className={styles.userInfo}>
            Hello {user.name},
            <br />
            <p>you are registered with</p>
            <div>
              <MailOutlined />  {user.email}
            </div>
            <div>
              <PhoneOutlined />  {user.phoneNo}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default HomePage;
