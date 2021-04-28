import { useContext, useState } from "react";
import {
  Box,
  makeStyles,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { ProfileContext } from "./context/profileContext";

interface Props {
  handleRegClose: () => void;
}

function Register(props: Props) {
  const classes = useStyles();
  const { registerNewProfile } = useContext(ProfileContext);
  const [values, registerValues] = useState<Object>({
    userName: "",
    name: "",
    password: "",
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    registerValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box className={classes.modal}>
      <Box className={classes.modalContent}>
        {<Typography>Register</Typography>}
        <TextField label="User Name" onChange={handleChange} name="userName" />
        <TextField label="Name" onChange={handleChange} name="name" />
        <TextField
          label="Password"
          onChange={handleChange}
          name="password"
          type="password"
        />
        <Button
          onClick={() => {
            registerNewProfile(values);
            props.handleRegClose();
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

export default Register;
