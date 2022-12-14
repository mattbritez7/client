import React, { useEffect } from 'react';
import {useState} from 'react';
import httpClient from "../../utils/httpClient";

//mui componets

import Button from "@mui/material/Button";


const Adm = () => {
    const [users, setUsers] = useState([]);

    const getUsersInCheck = () => {
        httpClient.get('/users/in-check').then((res) => {
            setUsers(res.data)
        })
    }
    
    const checkUser = (Email) => {
        console.log(Email)
        httpClient.put('/users/checked', {
            Email,
            IsCheck: true
        }).then((res) => {
            getUsersInCheck()
            alert('Usuario aceptado con exito.');
        })
    }
    
    const deleteUser = (Email) => {
        console.log(Email)
        httpClient.post('/users/delete-user', {
            Email
        }).then((res) => {
            getUsersInCheck()
            alert('Usuario eliminado con exito');
        })
    }

    useEffect(() => {
        getUsersInCheck();
    }, [])

  return (
    <div>
      <Button variant="contained" href="/all-sales" style={{marginTop: 20}}>Volver</Button>
      {
        (users.length === 0) ? <h1>No hay usuarios por aceptar</h1> :
        <h1>Lista de Vendedores y Administrador por aceptar:</h1>
      }
        {users?.map((item) => {
            return (
                <div key={item.Name}>
                    <h1>{item.Name}</h1>
                    <h2>{item.Email}</h2>
                    <h2>{(item.IsAdmin) ? 'Administrador' : 'Vendedor'}</h2>
                    <Button variant="contained" onClick={() => checkUser(item.Email)}> Aceptar</Button>
                    <Button variant="contained" onClick={() => deleteUser(item.Email)}> Rechazar</Button>
                </div>
            );
        })}
    </div>
  )
}

export default Adm