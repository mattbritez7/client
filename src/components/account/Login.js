/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { useState } from "react";
import httpClient from "../../utils/httpClient";
import { useNavigate } from "react-router-dom";
import Image from "../../images/imagen1.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function Login() {
  const navigate = useNavigate();
  const [psw, setPsw] = useState(false);

  const [data, setData] = useState({
    Email: "",
    Password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    httpClient
      .post("/users/login", {
       Email: data.Email,
       Password: data.Password
      })
      .then((res) => {
        const isAdmin = res.data.user.IsAdmin;
        const isCheck = res.data.user.IsCheck;
        const token = res.data.token;
        if(isAdmin && isCheck) {
          navigate("/all-sales");
        } 
        if(!isCheck){
          navigate("/waiting");
        }
        localStorage.setItem('token', token);
      })
      .catch((err) => console.log('err'));
  };

  const sucess = (a) => {
    toast.success(a);
  };

  const changePsw = () => {
    console.log("asd")
    sucess("Revise su casilla de mensajes para recuperar la cuenta.")
  }

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };


  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { ml: "50px", mt: "30px", width: "300px" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid
          container
          spacing={2}
          style={{
            width: "100%",
            maxWidth: "380px",
            margin: "100px auto ",
            paddingRight: "10px",
          }}
        >
          <img
            src={Image}
            alt="imagen1"
            width="380"
            height="220"
            style={{
              marginLeft: "17px",
              marginBottom: "20px",
              marginTop: "30px",
              borderRadius: "5px",
            }}
          />
          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth>
            {(psw === false) && <>
              <Grid item xs={12} mb="40px">
                <TextField
                  type="email"
                  label="Email"
                  name='Email'
                  required
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                />
              </Grid>
              <TextField
                type="password"
                label="Contraseña"
                name='Password'
                variant="outlined"
                fullWidth
                required
                id="fullWidth"
                size="small"
                onChange={handleInputChange}
              />
              </>
              
            }
                <a href="#" style={{marginTop: "20px"}} onClick={() => setPsw(true)}>¿Perdiste la contraseña?</a>
              {(psw === true) && <>
                <TextField
                  type="text"
                  label="Cuenta de correo electronico"
                  name='Password'
                  variant="outlined"
                  fullWidth
                  required
                  id="fullWidth"
                  size="small"
                  style={{marginTop: "20px"}}
                />
                <Grid item xs={12} mt="40px">
                  <Button variant="contained" fullWidth onClick={changePsw}>
                    Recuperar cuenta.
                  </Button>
                </Grid>
              </>
              }
            {(psw === false) &&
              <Grid item xs={12} mt="40px">
                <Button variant="contained" fullWidth onClick={onSubmit}>
                  Ingresar
                </Button>
              </Grid>
            }
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </div>
  );
}
