import React from "react";
import { useEffect, useState } from "react";
import httpClient from "../../utils/httpClient";
import CardVentas from "../card/Card";

//mui components

import PersistentDrawerRight from "../drawer/Drawer";

const Pendients = () => {
  const [pending, setPending] = useState([]);
  const [data, setData] = useState({
    Estado: "Pendiente",
  });


  const getPending = () => {
    httpClient.get("/tasks/pending")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setPending(data);
  })
}

const deleteTask = (id) => {
  httpClient
    .delete(`/tasks/${id}`)
    .then((res) => {
      const data = res.data;
      console.log(data);
    })
    .then(() => {
      httpClient.get("/tasks").then((res) => {
        const data = res.data;
        console.log(data);
        setPending(data);
      });
    });
};

function editTask(id) {
    httpClient.put(`/tasks/${id}`, {
                status: data.status,
            }).then((res) => {
                const data = res.data;
                console.log(data);
            });
    }

  useEffect(() => {
    getPending()
  }, [])

  return (
    <>
      <PersistentDrawerRight />

    {(pending.length === 0) ?
     <h1>No hay ventas pendientes</h1> :
     <CardVentas sales={pending} deleteTask={deleteTask} editTask={editTask} />
    }
    </>
        
  );
        
};

export default Pendients;