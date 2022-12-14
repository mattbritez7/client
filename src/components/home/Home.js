import React from "react";
import CardVentas from "../card/Card";
import Drawer from "../drawer/Drawer";
import { useEffect, useState } from "react";
import httpClient from "../../utils/httpClient";

const Home = () => {
  const [sell, setSell] = useState([]);
  const fetchTask = () => {
    httpClient.get("/tasks/alltasks").then((res) => {
      const data = res.data;
      console.log(data);
      setSell(data);
    });
  };

  const token = window.localStorage.getItem("token");
  console.log(token);

  const deleteTask = (id) => {
    httpClient
      .delete(`/tasks/${id}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
      })
      .then(() => {
        httpClient.get("/tasks/alltasks").then((res) => {
          const data = res.data;
          console.log(data);
          setSell(data);
        });
      });
  };

  const editTask = (id) => {
    httpClient.get(`/tasks/${id}`).then((res) => {
      const data = res.data;
      console.log(data);
    });
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div>
      <Drawer />
      <CardVentas sales={sell} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
};

export default Home;
