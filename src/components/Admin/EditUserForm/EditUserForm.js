import React, { useState, useCallback } from "react";
import { Avatar, Form, Input, Select, Row, Col } from "antd";
import { useDropzone } from "react-dropzone";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import NoAvatar from "../../../assets/img/png/no-avatar.png";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserdata] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });
  //console.log(avatar);

  const updateUser = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm userData={userData} setUserdata={setUserdata} />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserdata, updateUser } = props;
  const { Option } = Select;
  return (
    <Form className="form-edit" onSubmit={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              defaultValue={userData.name}
              onChange={(e) =>
                setUserdata({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}></Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>
    </Form>
  );
}
