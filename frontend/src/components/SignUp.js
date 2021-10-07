import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import TextField from './TextField';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required()
        .min(5, 'Username must contain at least 5 characters')
        .max(20, 'Username must not contain more than 20 characters'),
    password: yup
        .string()
        .required()
        .min(5, 'Password must contain at least 5 characters')
        .max(20, 'Password must not contain more than 20 characters'),
    name: yup
        .string()
        .required()
})

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (event) => {
        console.log(event)
        const credentials = {
            username: event.username,
            password: event.password,
            name: event.name
        };
        dispatch(setUser(credentials));
        history.push('/');
    };

    return (
        <Formik
            initialValues={{
                username:'',
                password:'',
                name:''
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="form ui">
                <Field
                    label="Username"
                    placeholder="Username"
                    name="username"
                    component={TextField}
                />
                <div style={{ color:'red' }}>
                    <ErrorMessage name="username" />
                </div>
                <Field
                    label="Password"
                    placeholder="Password"
                    name="password"
                    component={TextField}
                />
                <div style={{ color:'red' }}>
                    <ErrorMessage name="password" />
                </div>
                <Field
                    label="name"
                    placeholder="name"
                    name="name"
                    component={TextField}
                />
                <div style={{ color:'red' }}>
                    <ErrorMessage name="password" />
                </div>
                <Button
                    type="submit"
                    data-cy="button-signUp"
                >
                    Sign Up
                </Button>
            </Form>
        </Formik>
    );
};

export default SignUp;