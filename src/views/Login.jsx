/* eslint-disable jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import authApi from '../api/auth';
import useAuth from '../hooks/useAuth';

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const Input = ({ label, ...props }) => {
  const [field, { error, touched }] = useField(props);
  const { id, name } = props;
  return (
    <div className="field">
      <label htmlFor={id || name}>{label}</label>
      <input className={touched && error ? 'input-error' : ''} {...field} {...props} />
      {touched && error && (
        <div className="field-error">{error}</div>
      )}
    </div>
  );
};

function Login() {
  const [error, setError] = useState();
  const { currentUser, handleUserLogin } = useAuth();

  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      const user = await authApi.login(email, password);
      handleUserLogin(user);
    } catch (err) {
      setError(err.message);
    }
  };

  if (currentUser) return <Redirect to="/" />;

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Login Examen</h1>
        {error && (
          <div className="form-error">{error}</div>
        )}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={onSubmit}
          validationSchema={loginValidationSchema}
        >
          {({ handleSubmit, isSubmitting, isValid }) => (
            <form onSubmit={handleSubmit}>
              <Input label="E-mail" name="email" id="email" type="email" />
              <Input label="Contraseña" name="password" id="password" type="password" />
              <div className="actions">
                <button disabled={isSubmitting || !isValid} type="submit">Ingresar</button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
