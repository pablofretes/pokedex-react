import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Button, makeStyles, Paper } from '@material-ui/core';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import TextField from './TextField';
import { useDispatch } from 'react-redux';
import signUpService from '../services/signUp';
import { newLogin } from '../reducers/loginReducer';
import { notificationError } from '../reducers/notificationReducer';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 100,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#E5709B',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    signUp: {
        backgroundColor: '#c2185b',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 8,
        height: 50,
        width: 300,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10
    },
    error: {
        fontFamily: 'Roboto, monospace',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'red'
    },
}));

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
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password must be the same!'),
    name: yup
        .string()
        .required()
});

const SignUp = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (event) => {
        console.log(event)
        const credentials = {
            username: event.username,
            password: event.password,
            name: event.name
        };
        try {
            const user = await signUpService.signUp(credentials);
            if(user){
                dispatch(newLogin(credentials));
                history.push('/');
            };
        } catch (error) {
            dispatch(notificationError('Your account was not created, try again!'));
            return null;
        };
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Formik
                    initialValues={{
                        username:'',
                        password:'',
                        name:''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <Field
                            label="Username"
                            placeholder="Username"
                            name="username"
                            component={TextField}
                        />
                        <div className={classes.error}>
                            <ErrorMessage name="username" />
                        </div>
                        <Field
                            label="Password"
                            placeholder="Password"
                            name="password"
                            component={TextField}
                            type="password"
                        />
                        <div className={classes.error}>
                            <ErrorMessage name="password" />
                        </div>
                        <Field
                            label="Password Confirmation"
                            placeholder="Password Confirmation"
                            name="passwordConfirmation"
                            component={TextField}
                            type="password"
                        />
                        <div className={classes.error}>
                            <ErrorMessage name="passwordConfirmation" />
                        </div>
                        <Field
                            label="name"
                            placeholder="name"
                            name="name"
                            component={TextField}
                        />
                        <div className={classes.error}>
                            <ErrorMessage name="name" />
                        </div>
                        <Button
                            className={classes.signUp}
                            type="submit"
                            data-cy="button-signUp"
                        >
                            Sign Up
                        </Button>
                    </Form>
                </Formik>
            </Paper>
        </div>
    );
};

export default SignUp;