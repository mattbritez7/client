import React from "react";

import { useEffect, useState } from "react";
import httpClient from "../../utils/httpClient";
import CardVentas from "../card/Card";

//mui components

import PersistentDrawerRight from "../drawer/Drawer";

const Aprobate = () => {
  const [aprobate, setAprobate] = useState([]);
  const [data, setData] = useState({
    Estado: "Pendiente",
  });

  useEffect(function fetchTask() {
    httpClient.get("/tasks/aprobate").then((res) => {
      const data = res.data;
      console.log(data);
      setAprobate(data);
    });
  }, []);

  const editTask = (id) => {
    httpClient
      .put(`/tasks/${id}`, {
        Estado: data.Estado,
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
      });
  };
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
          setAprobate(data);
        });
      });
  };

  return (
    <>
      <PersistentDrawerRight />
      {(aprobate.length === 0) ?
        <h1>No hay ventas aprobadas</h1> :
        <CardVentas sales={aprobate} deleteTask={deleteTask} editTask={editTask} />
    }
    </>
  );
};

export default Aprobate;
