import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from "./util/Alert";
import {makePost, makeGet} from "./util/requestMaker";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                mini-list.am
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register() {
    const classes = useStyles();
    const [inputForm, setInputForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const Severities = {success: "success", error: "error", warning: "warning", info: "info"};
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setInputForm({
            ...inputForm,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!inputForm.firstName){
            setSeverity(Severities.error);
            setMessage("First name is required.");
            setOpen(true);
            setTimeout(() => {
                window.location.reload()
            }, 3000);
            return;
        }
        if(!inputForm.lastName){
            setSeverity(Severities.error);
            setMessage("Last name is required.");
            setOpen(true);
            setTimeout(() => {
                window.location.reload()
            }, 3000);
            return;
        }
        if (!inputForm.email || !inputForm.email.match(mail)) {
            setSeverity(Severities.error);
            setMessage("Please input valid email.");
            setOpen(true);
            setTimeout(() => {
                window.location.reload()
            }, 3000);
            return;
        }
        if (!inputForm.password || inputForm.password.length < 8) {
            setSeverity(Severities.error);
            setMessage("The password must contain at least 8 characters.");
            setOpen(true);
            setTimeout(() => {
                window.location.reload()
            }, 3000);
            return;
        }

        try {
            let res = await makePost("/api/auth/login");
            if (res.status === 200) {
                setOpen(true)
                setSeverity(Severities.success)
                setMessage("Account created successfully. \nOpen your mailbox in order to activate the account")
            }
            if (res.status === 404 || res.status === 403) {
                setOpen(true)
                setSeverity(Severities.error)
                setMessage("Invalid request")

            }
            if (res.status === 400) {
                setOpen(true)
                setSeverity(Severities.error)
                setMessage(`User with email: ${inputForm.firstName} already exists.`)

            }
        } catch (e) {
            setSeverity(Severities.error);
            setMessage("No Connection");
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 3000);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={inputForm.firstName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={inputForm.lastName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={inputForm.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={inputForm.password}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Alert open={open} message={message} handleClose={handleClose} severity={severity}/>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}