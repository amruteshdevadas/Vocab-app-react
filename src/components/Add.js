import React from "react";
import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import axios from "axios";
import { Alert } from "@mui/material";
import { useHistory } from "react-router-dom";
function Add() {
  const [value, setValue] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const history = useHistory();
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(value);
    await axios
      .post("https://vocabulary-251.herokuapp.com/addword", { value: value })
      .then((response) => {
        // console.log(response.data)
        // setAlert(true)
        // setSeverity("success")
        // setMessage(response.data)
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setAlert(true);
        setMessage("Something Went Wrong");
      });
  };
  return (
    <>
      {alert && <Alert severity={severity}>{message}</Alert>}

      <Box
        sx={{
          maxWidth: "50%",
          margin: "auto",
          marginTop: "5rem",
          backgroundColor: "rgb(102, 179, 255)",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            id="standard-basic"
            label="Enter word"
            variant="standard"
            name="word"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          />
          <div>
            <Button
              variant="contained"
              color="warning"
              sx={{ marginTop: "1.5rem" }}
              onClick={handleAdd}
            >
              Add
            </Button>
          </div>
        </Grid>
      </Box>
    </>
  );
}

export default Add;
