import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';

import { useUserContext } from "../context/UserContext";


const buttonStyle = {
    marginLeft: '10px',
};


const RegisterButton = () => {
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
                        <Button variant="contained" color="secondary" size="small" style={buttonStyle} onClick={register}>
                            Register
    </Button>

                    </>
                )}
        </nav>
    );
};

export default RegisterButton;