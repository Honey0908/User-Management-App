import React from 'react';
import { Form, Button, Typography, message, Input } from 'antd';
import { Formik, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { UploadOutlined } from '@ant-design/icons';
import userAvatar from '../../assets/userAvatar.png'
import styles from './SignUpForm.module.css';


const { Title } = Typography;

interface SignupValues {
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  confirmPassword: string;
  image: File | null;
}

const initialValues: SignupValues = {
  name: '',
  email: '',
  phoneNo: '',
  password: '',
  confirmPassword: '',
  image: null,
};

/* Validate form values */
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(15, 'Name must be at least 15 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNo: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid phone number')
    .required('Phone number is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  image: Yup.mixed()
    .test(
      'fileSize',
      'File size must be less than 2MB',
      (value) => !value || (value && (value as File).size <= 2 * 1024 * 1024)
    )
    .test(
      'fileType',
      'Only JPG or PNG files are allowed',
      (value) => !value || (value && ['image/jpeg', 'image/png'].includes((value as File).type))
    ),
});


const SignupForm: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values: SignupValues) => {
    const { name, email, phoneNo, password, image } = values;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      dispatch(
        setUser({
          name,
          email,
          phoneNo,
          password,
          image: base64String,
        })
      );
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  };

  const handleFileUpload = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      message.error('Only JPG or PNG files are allowed');
      return false;
    }

    if (file.size > maxSize) {
      message.error('File size must be less than 2MB');
      return false;
    }
    return true;
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
    const file = event.target.files && event.target.files[0];
    if (file && handleFileUpload(file)) {
      setFieldValue('image', file);
    }
  };



  return (
    <>
      <Title>SignUp</Title>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleSubmit, touched, errors, handleBlur, handleChange, setFieldValue, handleReset }) => (

          <Form onFinish={handleSubmit}>

            {/* Image */}
            <Form.Item name="image" validateStatus={touched.image && errors.image ? 'error' : ''} labelCol={{ span: 24 }} >
              <Input
                type="file"
                accept="image/jpeg,image/png"
                style={{ display: 'none' }}
                name="image-upload"
                id="image-upload"
                onChange={(event) => handleFileChange(event, setFieldValue)}
              />

              <label htmlFor="image-upload">
                <div className={styles.ImgaeInputDiv}>
                  <UploadOutlined className={styles.UploadIcon} />
                  <img src={values.image ? URL.createObjectURL(values.image) : userAvatar} alt="Preview" height="100%" width="100%" />
                </div>
              </label>

              <ErrorMessage name="image">
                {(msg) => <div style={{ color: 'red', textAlign: "center" }}>{msg}</div>}
              </ErrorMessage>
            </Form.Item>

            {/* User Name */}
            <Form.Item label="Name" name="name" validateStatus={touched.name && errors.name ? 'error' : ''} labelCol={{ span: 24 }} >
              <Input name="name" value={values.name} onChange={handleChange}
                onBlur={handleBlur} />
              <ErrorMessage name="name">
                {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              </ErrorMessage>

              {/* Email */}
            </Form.Item>
            <Form.Item label="Email" name="email" validateStatus={touched.email && errors.email ? 'error' : ''} labelCol={{ span: 24 }} >
              <Input name="email" value={values.email} onChange={handleChange}
                onBlur={handleBlur} />
              <ErrorMessage name="email">
                {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              </ErrorMessage>
            </Form.Item>

            {/* Phone number */}
            <Form.Item label="Phone Number" name="phoneNo" validateStatus={touched.phoneNo && errors.phoneNo ? 'error' : ''} labelCol={{ span: 24 }} >
              <Input name="phoneNo" value={values.phoneNo} onChange={handleChange}
                onBlur={handleBlur} />

              <ErrorMessage name="phoneNo">
                {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              </ErrorMessage>
            </Form.Item>

            {/* password */}
            <Form.Item label="Password" name="password" validateStatus={touched.password && errors.password ? 'error' : ''} labelCol={{ span: 24 }} >
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

            {/* confirm Password */}
            <Form.Item label="Confirm Password" name="confirmPassword" validateStatus={touched.confirmPassword && errors.confirmPassword ? 'error' : ''} labelCol={{ span: 24 }}>
              <Input.Password
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ backgroundColor: 'bisque', paddingBlock: 0 }}
              />
              <ErrorMessage name="confirmPassword" >
                {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              </ErrorMessage>
            </Form.Item>

            {/* submit and reset Buttons */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
              <Button type="default" htmlType="reset" style={{ backgroundColor: 'red', color: "white", marginLeft: "1em" }} onClick={handleReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
