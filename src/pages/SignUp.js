import * as React from 'react';
import { useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux'
import { userSignup } from '../store/auth/index';
import SignupForm from '../components/shared/AuthForm';
import { useSelector } from 'react-redux'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUp = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const res = await dispatch(userSignup({
            email: data.get('email'),
            password: data.get('password'),
        }))

        if(res.error){
            setOpen(true)
        }else{
            navigate("/top-stories/home");
        }
    };

    return (
        <>
            <SignupForm
                formName='Sign Up'
                navigateTo='/login'
                navigateMessgae='Already have an account? Login'
                handleSubmit={handleSubmit}
            />
            <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                    {auth.error}
                </Alert>
            </Snackbar>
        </>

    );
}

export default SignUp;