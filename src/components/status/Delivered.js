import React from "react";
import { useEffect, useState } from "react";
import httpClient from "../../utils/httpClient";
import CardVentas from "../card/Card";


//mui components
import PersistentDrawerRight from "../drawer/Drawer";

const Delivered = () => {
  const [delivered, setDelivered] = useState([]);
  const [data, setData] = useState({
    Estado: "Pendiente",
  });
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(function fetchTask() {
    httpClient.get("/tasks/delivered").then((res) => {
      const data = res.data;
      console.log(data);
      setDelivered(data);
    });
  }, []);

  const editTask = (id) => {
    httpClient
      .put(`/tasks/${id}`, {
        Estado: data.status,
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
          setDelivered(data);
        });
      });
  };

  return (
    <>
    <PersistentDrawerRight/>
    {(delivered.length === 0) ?
     <h1>No hay ventas entregadas</h1> :
     <CardVentas sales={delivered} deleteTask={deleteTask} editTask={editTask} />
    }
    </>
  );
};

export default Delivered;
