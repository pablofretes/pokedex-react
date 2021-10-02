import React from 'react';
import signUp from '../services/signUp';
import { Field, Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import TextField from './TextField';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required()
        .min(5, 'Username must contain at least 5 characters')
        .max(20, 'Username must not contain more than 20 characters'),
    password: yup
        .string()
        .required()
        .min(5, 'Username must contain at least 5 characters')
        .max(20, 'Username must not contain more than 20 characters'),
    name: yup
        .string()
        .required()
})

const SignUp = ({ setUser }) => {
    const history = useHistory();

    const onSubmit = async (event) => {
        event.preventDefault();
        
        const credentials = {
            username: event.username,
            password: event.password,
            name: event.name
        };

        try {
            const user = await signUp.signUp(credentials);
            if(user){
                window.localStorage.setItem('loggedUser', JSON.stringify(user))
                setUser(user);
                history.push('/');
            };
        } catch (error) {
            console.log(error);
            return null;
        };
    };

    return (
        <Formik
            initialValues={{
                username:'',
                password:'',
                name:''
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
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
                <Field
                    label="Name"
                    placeholder="Name"
                    name="name"
                    component={TextField}
                />
                <Button
                    type="submit"
                    color="pink"
                >
                    Sign Up
                </Button>
            </Form>
        </Formik>
    );
};

export default SignUp;