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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const Severities = {success: "success", error: "error", warning: "warning", info: "info"};
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();
    const [input, setInput] = useState({
        email: localStorage.getItem("listAmLogin"),
        password: localStorage.getItem("listAmPassword"),
        "": localStorage.getItem("listAmRemember")
    });

    const handleInputChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    });

    const handleSignIn = async (e) => {
        e.preventDefault();
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!input.email || !input.email.match(mailFormat)) {
            setSeverity(Severities.error);
            setMessage("Please input valid email.");
            setOpen(true);
            setTimeout(() => {
                window.location.reload()
            }, 3000);
            console.log(input)
            return;
        }
        if (!input.password || input.password.length < 8) {
            setSeverity(Severities.error);
            setMessage("The password must contain at least 8 characters.");
            setOpen(true);
            setTimeout(() => {
                window.location.reload()
            }, 3000);
            return;
        }
        let response;
        try {
            response = await makePost("/api/auth/login");
        } catch (e) {
            setSeverity(Severities.error);
            setMessage("No Connection");
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 3000);
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type="email"
                        onChange={handleInputChange}
                        value={input.name}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleInputChange}
                        value={input.name}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" onChange={handleInputChange}
                                           checked={input.name}/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Alert open={open} message={message} handleClose={handleClose} severity={severity}/>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}