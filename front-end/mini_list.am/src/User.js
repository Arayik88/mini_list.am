import React, {useEffect, useState} from 'react';
import './CSS/styles.css';
import Button from '@material-ui/core/Button';
import LanguageIcon from '@material-ui/icons/Language';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SecurityIcon from '@material-ui/icons/Security';
import Alert from './util/Alert';
import PublishIcon from '@material-ui/icons/Publish';
import img from "./pics/download.jpg"
import Items from "./Items";

const styles = {

    largeButton: {
        width: 50,
        height: 50,
    },
    largeIcon: {
        width: 30,
        height: 30
    }
};

function UserGeneral() {
    let [state, setState] = useState({firstName: "", lastName: "", email: "", phone: ""});
    const Severities = {success: "success", error: "error", warning: "warning", info: "info"};
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("");
    const [message, setMessage] = React.useState("");
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        async function getData() {
            let response = await fetch("http://localhost:8090/api/users/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer_" /*+ localStorage.getItem("token")*/
                }
            });
            let userInfo = await response.json();
            setState(userInfo)

        }
        //add then
        getData();
    }, []);
    const uploadData = async () => {
        let response = await fetch("http://localhost:8090/api/user/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer_" /*+ localStorage.getItem("token")*/
            },
            body: JSON.stringify({
                "firstName": state.firstName,
                "lastName": state.lastName,
                "email": state.email,
                "phone": state.phone,
                "imageId": null,
                "id": User.id
            })


        });
        let result = response.status;
        if (result === 200) {
            setSeverity(Severities.success)
            setMessage(" Change was successful");
            setOpen(true);
        } else {
            setSeverity(Severities.warning)
            setMessage(" Something went wrong");
            setOpen(true);
        }

    }
    return (<div style={{paddingRight: "20px"}}>
        <div className="about-container-list-item"><TextField id='Name' helperText="Name" fullWidth="true"
                                                              variant="filled" onChange={(e) => setState({
            ...state,
            firstName: e.target.value
        })} value={state.firstName}></TextField></div>
        <div className="about-container-list-item"><TextField id="Surname" helperText="Surname" fullWidth="true"
                                                              variant="filled" onChange={(e) => setState({
            ...state,
            lastName: e.target.value
        })} value={state.lastName}></TextField></div>
        <div className="about-container-list-item"><TextField id="Email" helperText="Email" fullWidth="true"
                                                              variant="filled" onChange={(e) => setState({
            ...state,
            email: e.target.value
        })} value={state.email}></TextField></div>
        <div className="about-container-list-item"><TextField id="Phone" helperText="Phone" fullWidth="true"
                                                              variant="filled" onChange={(e) => setState({
            ...state,
            phone: e.target.value
        })} value={state.phone}></TextField></div>
        <Button onClick={uploadData} color="primary" variant="contained">Change</Button>
        <Alert open={open} message={message} handleClose={handleClose} severity={severity}></Alert>

    </div>)
}

function UserSecurity() {
    let [state, setState] = useState({});

    const uploadData = async () => {

        let response = await fetch("http://localhost:8080/api/user/change-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer_" /*+ localStorage.getItem("token")*/
            },
            body: JSON.stringify({
                "email": User.email,
                "oldPassword": state.oldPassword,
                "newPassword": state.newPassword
            })
        });

        if (response.status === 400) {
            //alert wrong password
        } else {
            //alert password changed successfully
        }
    }

    return (<div style={{paddingRight: "20px"}}>
        <div className="about-container-list-item"><TextField type="password" helperText="Old Password" fullWidth="true"
                                                              variant="filled" onChange={(e) => setState({
            ...state,
            oldPassword: e.target.value
        })} value={state.oldPassword}></TextField></div>
        <div className="about-container-list-item"><TextField type="password" helperText="New Password" fullWidth="true"
                                                              variant="filled" onChange={(e) => setState({
            ...state,
            newPassword: e.target.value
        })} value={state.newPassword}></TextField></div>

        <Button onClick={uploadData} color="primary" variant="contained">Change</Button>
    </div>)

}

function GeneralInfo({setMessage: setMessage, setOpen, setSeverity}) {
    const Severities = {success: "success", error: "error", warning: "warning", info: "info"};
    const [state, setState] = useState({info: <UserGeneral></UserGeneral>})
    const [Image, setImage] = useState(null);


    const UploadImage = () => {

        document.getElementById('fileInput').click();
    }
    const onChangeHandler = async (event) => {

        let x = event.target.files[0];
        const data = new FormData()
        data.append('image', x);
        let response = await fetch("http://localhost:8090/api/user/upload-image", {
            method: "POST",
            headers: {

                "Authorization": "Bearer_ " + localStorage.getItem("token")

            },
            body: data
        });
        response = await fetch(`http://localhost:8090/api/user/image/${JSON.parse(localStorage.getItem("UserContext")).id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer_ " + localStorage.getItem("token")
                }
            })

        x = await response.blob();
        setImage(URL.createObjectURL(x))


    }
    useEffect(() => {
        async function getdata() {
            try {
                let response = await fetch(`http://localhost:8080/api/user/image/${JSON.parse(localStorage.getItem("UserContext")).id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": "Bearer_ " + localStorage.getItem("token")
                        }
                    })


                let x = await response.blob();
                setImage(URL.createObjectURL(x))

            } catch (error) {

                setOpen(true)
                setSeverity(Severities.error)
                setMessage("No Connection")
            }
        }

    }, [])
    return (
        <div className="general-row">
            <div className='image-container-row'>


                <img src={Image} alt='userImage' className='image'/>


                <div style={{height: 0, overflow: "hidden"}}>
                    <input type="file" id="fileInput" name="fileInput" onChange={onChangeHandler}/>
                </div>


                <div><IconButton size="medium" style={styles.largeButton} onClick={UploadImage}> <PublishIcon
                    style={styles.largeIcon} color='primary'></PublishIcon></IconButton></div>
            </div>

            <div className='about-container-row'>
                <IconButton onClick={() => setState({info: <UserGeneral></UserGeneral>})}
                            color='primary'><LanguageIcon></LanguageIcon></IconButton>
                <IconButton onClick={() => setState({info: <UserSecurity></UserSecurity>})}
                            color="primary"><SecurityIcon></SecurityIcon></IconButton>
                {state.info}
            </div>
        </div>
    );
}

function User() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("");
    const handleClose = () => {
        setOpen(false);
    };
    const [message, setMessage] = React.useState("");
    return (

        <div className="main-container">

            <GeneralInfo setMessage={(e) => setMessage(e)} setSeverity={(e) => setSeverity(e)}
                         setOpen={(e) => setOpen(e)}></GeneralInfo>
            <Items/>
            <Alert open={open} message={message} handleClose={handleClose} severity={severity}></Alert>

        </div>
    );

}

export default User;