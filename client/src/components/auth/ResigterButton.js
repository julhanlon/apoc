import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useUserContext } from "../context/UserContext";


const buttonStyle = {
    marginLeft: '10px',
};

const useStyles = makeStyles({
    root: {
        background: "#cd3239",
        borderRadius: 15,
        border: 0,
        color: 'white',
        height: 33,
        padding: '0 15px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
});


const RegisterButton = () => {
    const classes = useStyles();
    const { userData, setUserData } = useUserContext();

    const history = useHistory();

    const register = () => history.push("/register");




    return (
        <nav className="auth-options" style={{ marginTop: "10px" }}>
            {userData.user ? (
                <>

                </>
            ) : (
                    <>
                        <Button classes={{
                            root: classes.root, // class name, e.g. `classes-nesting-root-x`
                            label: classes.label, // class name, e.g. `classes-nesting-label-x`
                        }} variant="contained" size="small" style={buttonStyle} onClick={register}>
                            Register
    </Button>

                    </>
                )}
        </nav>
    );
};

export default RegisterButton;