import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import httpClient from "../../utils/httpClient";

//mui components
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function CardVentas() {
  const [sales, setSales] = useState([]);
  const salesId = useParams();
  const getDetails = async (id) => {
    httpClient.get(`/tasks/${id}`).then((res) => {
      const data = res.data;
      console.log(data);
      setSales(data);
    });
  };

  useEffect(() => {
    getDetails(salesId.id);
  }, []);

  if (sales.length === 0) {
    return <h1>Cargando..</h1>;
  }
  return (
    <div>
      <Button variant="contained" href="/all-sales" style={{marginTop: 20}}>Volver</Button>
      <Box display="grid">
        <Grid sx={{ maxWidth: 380, marginTop: "10px", alignItems: "center" }} style={{ margin: "0 auto" }}>
          {sales?.map((item) => {
            return (
              <Grid key={item._id}>
                <h1>Vendedor: {item.user}</h1>
                <TableContainer
                  style={{ margin: "0 auto" }}
                  component={Paper}
                  sx={{ maxWidth: 380, padding: "5px", marginTop: "10px" }}
                >
                  <Table
                    sx={{ maxWidth: 370 }}
                    aria-label="simple table"
                    key={item._id}
                  >
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Estado de la venta:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.status}
                        </TableCell>
                        </TableRow>
                        <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Nombre y Apellido:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.name}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Producto:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.product}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Plan:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.day}
                        </TableCell>
                      </TableRow>

                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Precio
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.price}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Dni:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.dni}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={item._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Fecha de Nacimiento:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.dateOfBirthday}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={item._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Direccion Del Comercio:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.directionOfCommerce}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Entre Calles:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.betweenStreets}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Direccion De La Casa:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.directionHouse}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Localidad:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.location}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Telefono 1:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.phone1}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Telefono 2:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.phone1}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="center"
                          sx={{ padding: "5px" }}
                        >
                          Hora de carga:
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "5px" }}>
                          {item.date}
                        </TableCell>
                      </TableRow>
                      <div style={{marginLeft: '120px'}}>
                      <h2>Comentarios:</h2>
                      <p>{item.user}:</p>
                      <p>-{item.comments}</p>
                      </div>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      </div>
  );
}
