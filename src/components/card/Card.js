import * as React from "react";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import httpClient from "../../utils/httpClient";
import GET_DATA from '../../auth/GET_DATA'


//mui components
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function CardVentas({ sales, deleteTask}) {

  const [userData, setUserData] = useState("");
  const [status, setStatus] = useState({
    status: "Pendiente",
  });

  const token = window.localStorage.getItem('token');

  const getData = async () => {
    const info = await GET_DATA(token)
    setUserData(info)
  }

  const editTask = (id, newState) => {
    httpClient
      .put(`/tasks/edit-status/${id}`, {
        status: newState
      })
      .then((res) => {
        console.log(res)
        setStatus({...status, status: id})
      });
  };

  const handleInputChange = (event, itemId) => {
    console.log(event.target.value);
    console.log(itemId)
    editTask(itemId, event.target.value)
  };

  useEffect(() => {
    getData()
  }, [])

  console.log(userData.isAdmin)
  if (sales.length === 0) {
    return <h1>NO HAY VENTAS</h1>;
  }
  return (
    <>
      <Box sx={{ width: 1}} display="grid">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3 }}>
          {sales?.map((item) => {
            return (
              <Grid item xs={12} sm={12} md={4} key={item._id}>
                <TableContainer
                  style={{ margin: "0 auto" }}
                  component={Paper}
                  sx={{ width: 400, padding: "15px", marginTop: "10px" }}
                >
                  
                  { (userData.isAdmin) ? <>
                    <Grid item xs={12} width="100%">
                      <InputLabel
                        id="demo-simple-select-label"
                        size="small"
                        name="status"
                      ></InputLabel>
                      <Select
                      onChange ={(e) => handleInputChange(e, item._id)}
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        defaultValue={item.status}
                        backgroundColor="red"
                        fullWidth
                        name="status"
                      >
                        <MenuItem value={"Pendiente"} width="10px">
                          Pendiente
                        </MenuItem>
                        <MenuItem value={"Aprobado"} width="10px">
                          Aprobado
                        </MenuItem>
                        <MenuItem value={"Entregado"} width="10px">
                          Entregado
                        </MenuItem>
                      </Select>
                 
                    
                        <IconButton
                          aria-label="delete"
                          >
                          <DeleteIcon onClick={() => deleteTask(item._id)} />
                        </IconButton>
                        {/* <IconButton
                          aria-label="edit"
                          sx={{ paddingLeft: "5px" }}
                        >
                          <EditIcon onClick={() => editTask(item._id)} />
                        </IconButton> */}
                          </Grid>
                   
                    
                    </>
                    : null
                }
                <TableCell sx={{ padding: "5px", fontSize: "10px" }}>
                        <h1 style={{marginLeft: 55}}>Vendedor: {item.user}</h1>
                </TableCell>
                    <Link to={`/sales/${item._id}`}>
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0, marginLeft: 20 },
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
                      </TableBody>
                    </Link>
             
                </TableContainer>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
