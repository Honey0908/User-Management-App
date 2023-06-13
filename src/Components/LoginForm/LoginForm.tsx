import React from 'react';
import { Form, Button, Input } from 'antd';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { UserLoginType, loginUser } from '../../store/userSlice';



const initialValues: UserLoginType = {
  email: '',
  password: '',
};


const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});


const LoginForm: React.FC = () => {

  const dispatch = useDispatch();
  const handleSubmit = (values:UserLoginType) => {
    dispatch(loginUser(values));
  };

  return (

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleSubmit, touched, errors, handleBlur, handleChange }) => (
          <Form onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              name="email"
              validateStatus={touched.email && errors.email ? 'error' : ''}
              labelCol={{ span: 24 }}
            >
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name="email">
                {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              </ErrorMessage>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              validateStatus={touched.password && errors.password ? 'error' : ''}
              labelCol={{ span: 24 }}
            >
              <Input.Password
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ backgroundColor: 'bisque', paddingBlock: 0 }}
              />
              <ErrorMessage name="password">
                {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              </ErrorMessage>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
  
  );
};

export default LoginForm;
