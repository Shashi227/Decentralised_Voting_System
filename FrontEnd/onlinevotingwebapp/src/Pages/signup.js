import React from 'react';
import {withRouter} from 'react-router-dom'
import { Avatar, FormControlLabel, Grid, Paper, TextField, Typography } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import userApi from '../Api/userApi'
import { FormHelperText } from '@material-ui/core';
import '../Containers/index.css';


const SignupPage = (props) => {

    const initialValues = {
        Name: '',
        Email: '',
        PhoneNumber: '',
        Password: '',
        ConfirmPassword: '',
        termsandconditions: false

    }

    const [isLoading, setLoading] = React.useState(false)
    const onSubmit = (values) => {
        console.log(values)
        setLoading(true)
        userApi.register(values).then(
            res => {
                console.log(res.data)
                setLoading(false);
                props.history.push("/")
            }
        ).catch(err => {
            setLoading(false);
            console.log(err)

        }
        )
        // setTimeout(() => {
        //     props.resetForm()
        //     props.setSubmitting(false)
        // }, 1500)
        console.log(props)
    }


    const validationSchema = Yup.object().shape({
        Name: Yup.string().min(3, "It's too short").required("Required"),
        Email: Yup.string().email("Enter the valid email").required("Required"),
        PhoneNumber: Yup.number().typeError("Enter valid Phone Number").required("Required"),
        Password: Yup.string().min(8,"Password minimum length should be 8").required("Required"),
        ConfirmPassword: Yup.string().oneOf([Yup.ref('Password')],"Password not matched").required("Required"),
        termsandconditions: Yup.string().oneOf(["true"],"Accept terms & conditions")
    })


    return (
        <Paper elevation={10} className="sigpage">
            <Grid align='center'>
                <Avatar><AddCircleOutlineIcon /></Avatar>
                <h2 className="block1">Sign Up</h2>
                <Typography variant='cation'>
                    Please fill this details to create account!
                </Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <form>
                            <Field as={TextField} id="filled-basic" name="Name" label="Name" variant="filled" fullWidth required
                                helperText={<ErrorMessage name="Name" />} />
                            <Field as={TextField} id="filled-basic" name="Email" label="Email" variant="filled" fullWidth required
                                helperText={<ErrorMessage name ="Email" />} />
                            <Field as={TextField} id="filled-basic" name="PhoneNumber" label="Phone Number" variant="filled" fullWidth required
                                helperText={<ErrorMessage name ="PhoneNumber" />} />
                            <Field as={TextField} id="filled-basic" name="Password" type= "password" label="Password" variant="filled" fullWidth required 
                                helperText={<ErrorMessage name ="Password" />} />
                            <Field as={TextField} id="filled-basic" name="ConfirmPassword" label="Confirm Password" variant="filled" fullWidth required
                                helperText={<ErrorMessage name ="ConfirmPassword" />} />
                        </form>

                        <Grid className="button">
                            <FormControlLabel
                                control={
                                    <Field as={Checkbox}
                                        name="termsandconditions"
                                        color="primary" fullWidth
                                    />
                                }
                                label="I accept the terms and conditions."
                                
                            />
                            <FormHelperText> <ErrorMessage name ="termsandconditions" /></FormHelperText>
                        </Grid>

                        <Button
                            type='submit'
                            variant="contained"
                            color="primary" fullWidth
                            endIcon={<SendIcon />}>
                            {isLoading ? "Loading..." : "Sign up"}
                        </Button>
                    </Form>
                )}
            </Formik>

        </Paper>
    );

}

export default withRouter(SignupPage)