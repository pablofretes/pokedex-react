import React from 'react';
import TextField from './TextField';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Button, makeStyles, Paper } from '@material-ui/core';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { newLogin } from '../reducers/loginReducer';

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
    logIn: {
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
        .min(5, 'Username must contain at least 5 characters'),
    password: yup
        .string()
        .required()
        .min(5, 'Username must contain at least 5 characters'),
});

const Login = () => {
    const classes = useStyles();
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
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Formik
                    initialValues={{
                        username:'',
                        password:'',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    style={{backgroundColor: '#222222'}}
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
                        <Button
                            className={classes.logIn}
                            type="submit"
                            data-cy="login-form-button"
                        >
                            Log In
                        </Button>
                    </Form>
                </Formik>
            </Paper>
        </div>
        
    );
};

export default Login;