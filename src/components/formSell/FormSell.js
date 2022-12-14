import * as React from "react";
import { useState, useEffect } from "react";
import httpClient from "../../utils/httpClient";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import GET_DATA from '../../auth/GET_DATA'


const FormSell = () => {
  const navigate = useNavigate();
  const [dataa, setDataa] = useState("");
  const token = localStorage.getItem('token');

  const sucess = (a) => {
    toast.success(a);
  };

  const getData = async () => {
    const info = await GET_DATA(token)
    console.log(info);
    setDataa(info)
  }
  const date = Date.now()
  const currentTimeSell = new Date(date).toLocaleDateString();
  
  useEffect(() => {
    getData()
  }, [])

  const [data, setData] = useState({
    user: '',
    date: currentTimeSell,
    status: 'Pendiente',
    product: '',
    price: '',
    day: '', 
    name: "",
    dni: "",
    dateOfBirthday: "",
    directionOfCommerce: "",
    betweenStreets: "",
    directionHouse: "",
    Location: "",
    phone1: "",
    phone2: "",
    comments: ""
  });
  
  const onSubmit = (e) => {
    e.preventDefault();
    httpClient
      .post("/tasks/createtask", {
        ...data,
        user: dataa.name
      })
      .then(() => setTimeout(function(){
        navigate("/all-sales");
    }, 3000))
      .then(() => sucess("Venta creada correctamente")).catch((err) => console.error(err));
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Button variant="contained" href="/all-sales" style={{marginTop: 20}}>Volver</Button>
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
            margin: "0 auto ",
            paddingRight: "10px",
            paddingBottom: "100px",
          }}
        >
          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Nombre y Apellido"
                  name="name"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Producto"
                  name="product"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Precio Del Producto"
                  name="price"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Plan"
                  name="day"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Dni"
                  name="dni"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Fecha De Nacimiento"
                  name="dateOfBirthday"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Direccion Del Comercio"
                  name="directionOfCommerce"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} mb="40px">
                <TextField
                  label="Entre Calles"
                  name="betweenStreets"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Direccion de la casa"
                  name="directionHouse"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Localidad"
                  name="location"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Telefono 1"
                  name="phone1"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <TextField
                label="Telefono 2"
                name="phone2"
                variant="outlined"
                fullWidth
                id="fullWidth"
                size="small"
                onChange={handleInputChange}
                required
              />
               <Grid item xs={12} mb="40px"></Grid>
              <TextField
                onChange={handleInputChange}
                name='comments'
                label="Comentario"
                id="fullWidth"
                multiline
                rows={4}
                placeholder='No requerido!'
              />

              <Grid item xs={12} mt="40px">
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  onClick={onSubmit}
                >
                  Subir venta
                </Button>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
        <ToastContainer />
      </Box>
    </div>
  );
};

export default FormSell;
