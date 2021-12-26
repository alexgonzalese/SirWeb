import React, { useState, useCallback, useEffect } from "react";
import { Avatar, Form, Input, Select, Row, Col, Button } from "antd";
import { useDropzone } from "react-dropzone";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import NoAvatar from "../../../assets/img/png/no-avatar.png";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  //console.log(props);
  const { row } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserdata] = useState({
    name: row.name,
    lastname: row.lastname,
    email: row.email,
    role: row.role,
    avatar: row.avatar,
  });
  //console.log(avatar);

  useEffect(() => {
    if (avatar) {
      setUserdata({ ...userData, avatar });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = (e) => {
    console.log("llego");
    // e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserdata={setUserdata}
        updateUser={updateUser}
      />
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
    <Form className="form-edit" onFinish={updateUser}>
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
        <Col span={12}>
          <Input
            prefix={<UserOutlined />}
            placeholder="Apellidos"
            defaultValue={userData.lastname}
            onChange={(e) =>
              setUserdata({ ...userData, lastname: e.target.value })
            }
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              defaultValue={userData.email}
              onChange={(e) =>
                setUserdata({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona un rol"
              defaultValue={userData.role}
              onChange={(e) => setUserdata({ ...userData, role: e })}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewr">Revisor</Option>
              <Option value="user">Usuario</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="password"
              prefix={<LockOutlined />}
              placeholder="Password"
              onChange={(e) =>
                setUserdata({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="password"
              prefix={<LockOutlined />}
              placeholder="Repetir Password"
              onChange={(e) =>
                setUserdata({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
