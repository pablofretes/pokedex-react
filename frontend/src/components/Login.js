import React from 'react';
import TextField from './TextField';
import { Field, Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { newLogin } from '../reducers/loginReducer';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required()
        .min(5, 'Username must contain at least 5 characters'),
    password: yup
        .string()
        .required()
        .min(5, 'Username must contain at least 5 characters'),
});

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (event) => {
        console.log(event);
        const credentials = {
            username: event.username,
            password: event.password,
        };
        dispatch(newLogin(credentials))
        history.push('/');
    }

    return(
        <Formik
            initialValues={{
                username:'',
                password:'',
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
                <Field
                    label="Password"
                    placeholder="Password"
                    name="password"
                    component={TextField}
                />
                <Button
                    type="submit"
                >
                    Log In
                </Button>
            </Form>
        </Formik>
    );
};

export default Login;