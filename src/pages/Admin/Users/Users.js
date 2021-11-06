import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersStatusApi } from "../../../api/user";
import ListUsers from "../../../components/Admin/ListUsers/ListUsers";

import "./Users.scss";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const token = getAccessTokenApi();

  //console.log(usersActive);

  useEffect(() => {
    getUsersStatusApi(token, true).then((response) => {
      setUsersActive(response.users);
    });

    getUsersStatusApi(token, false).then((response) => {
      setUsersInactive(response.users);
    });
  }, [token]);

  return (
    <div className="users">
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
      ></ListUsers>
    </div>
  );
}
