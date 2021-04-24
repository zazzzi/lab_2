import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";

function EditModal() {
    const classes = useStyles();

    function handleChange(){

    }

    return(
        <Box >
            <Box >
            {<Typography>Register</Typography>}
                <TextField 
                    label="User Name"
                    onChange={handleChange}
                    name="userName"
                />
                <TextField 
                    label="Name"
                    onChange={handleChange}
                    name="name"
                />
                <TextField 
                    label="Password"
                    onChange={handleChange}
                    name="password"
                />
                <Button
                    onClick={() => {
                        
                    }}
                >
                Register
            </Button>
            </Box> 
        </Box> 
    )
}
const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute"
      },
      modalContent: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));
export default EditModal;