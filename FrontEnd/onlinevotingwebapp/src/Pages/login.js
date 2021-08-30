import React from 'react';
import {withRouter} from 'react-router-dom'
import { Avatar, Grid, Link, Paper, TextField, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import AlertMessage  from '../Component/notification';

import * as Yup from 'yup'
import userApi from '../Api/userApi'
import '../Containers/index.css';


const LoginPage = (props) => {


    const initialValues = {
        Username: '',
        Password: '',
        remember: false

    }

    const [isLoading, setLoading] = React.useState(false)
    const [loginStatus, setLoginStatus] = React.useState("")
    const onSubmit = (values) => {
        console.log(values)
        setLoading(true)
        userApi.login(values).then(
            res => {
                console.log(res.data)
                setLoading(false);
                props.history.push("/")
            }
        ).catch(err => {
            // console.log(err.response.data.message)
            setLoading(false);
            return setLoginStatus({ msg: err.response.data.message, key: Math.random(), status:"error"})
            // console.log(err)

        }
        )
        // setTimeout(() => {
        //     props.resetForm()
        //     props.setSubmitting(false)
        // }, 1500)
        console.log(props)
    }

    const validationSchema = Yup.object().shape({
        Username: Yup.string().email('Plese enter valid uername').required("Required"),
        Password: Yup.string()
            .required('No password provided!')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters.')
    })




    return (
        <Paper elevation={10} className="logpage">

            <Grid align='center'>
                <Avatar><LockIcon /></Avatar>
                <h2>Sign In</h2>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Grid className="username">
                            <Field as={TextField} id="outlined-user" name="Username"
                                label="Username" variant="outlined" fullWidth required
                                helperText={<ErrorMessage name="Username" />} />
                        </Grid>

                        <Grid className="password">
                            <Field as={TextField} id="outlined-pass" type="password" name="Password"
                                label="Password" variant="outlined" fullWidth required
                                helperText={<ErrorMessage name="Password" />} />
                        </Grid>

                        <Field as={FormControlLabel}
                            name="remember"
                            control={
                                <Checkbox color="primary" />
                            }
                            label="Remember me" />

                        <Grid className="button">
                            <Button type='submit' variant="contained" color="primary" fullWidth endIcon={<SendIcon />} >
                                {isLoading ? "Loading..." : "Sign in"}
                            </Button>
                        {loginStatus ? <AlertMessage key={loginStatus.key} message={loginStatus.msg} status={loginStatus.status} /> : null}

                        </Grid>
                    </Form>
                )}
            </Formik>


            <Typography>
                <Link href="#">
                    Forgot password?
                </Link>
            </Typography>
            <Typography> Do you have an account?
                <Link href="#" onClick={() => props.handleChange("event", 1)}>
                    &nbsp; Sign Up?
                </Link>
            </Typography>
        </Paper>

    );

}
export default withRouter(LoginPage)