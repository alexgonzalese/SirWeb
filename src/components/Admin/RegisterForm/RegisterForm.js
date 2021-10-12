import React, { useState } from "react";

import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";

import { signUpApi } from "../../../../src/api/user";

import "./RegisterForm.scss";
import Password from "antd/lib/input/Password";

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privaciPolicy: false,
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privaciPolicy: false,
  });

  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }

    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }

    if (type === "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
  };

  const changeForm = (e) => {
    console.log("ok");
    if (e.target.name === "privaciPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const register = async (e) => {
    const { email, password, repeatPassword, privaciPolicy } = formValid;

    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const emailVal = inputs.email;
    const privaciPolicyVal = inputs.privaciPolicy;

    if (!emailVal || !passwordVal || !repeatPasswordVal || !privaciPolicyVal) {
      notification["error"]({
        message: "Todos los campos son obligaorios",
      });
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification["error"]({
          message: "Los Password deben ser iguales.",
        });
      } else {
        const result = await signUpApi(inputs);
        if (!result.ok) {
          notification["error"]({
            message: result.message
          });
        } else {
          notification["success"]({
            message: result.message
          });
          resetForm();
        }
      }
    }
  };

  const resetForm = () =>{
    const inputs = document.getElementsByTagName("input");

    for(let i = 0; i < inputs.length; i++){
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privaciPolicy: false
    });

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privaciPolicy: false
    });
  };

  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={
            <UserOutlined
              className="site-form-item-icon"
              style={{ color: "rgba(0,0,0,.25)" }}
            />
          }
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={
            <LockOutlined
              className="site-form-item-icon"
              style={{ color: "rgba(0,0,0,.25)" }}
            />
          }
          type="password"
          name="password"
          placeholder="Password"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={
            <LockOutlined
              className="site-form-item-icon"
              style={{ color: "rgba(0,0,0,.25)" }}
            />
          }
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privaciPolicy"
          onChange={inputValidation}
          checked={inputs.privaciPolicy}
        >
          He leido y acepto la politica de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
