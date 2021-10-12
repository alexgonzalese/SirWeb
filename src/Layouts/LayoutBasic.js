import React from "react";

import { Layout } from "antd";
import {BrowserRouter as Router,  Switch,  Route,  Link} from "react-router-dom";

import "./LayoutsBasic.scss"
import { logDOM } from "@testing-library/react";

export default function LayoutBasic(props){
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
console.log(props);

    return (
        <Layout>
          <h2>Menu Basic</h2>
          <Layout>
            <Header>Header......</Header>
    
            <Content>
    
              <LoadRouters routes={routes} />
    
            </Content>
    
            <Footer>Alexander Espinoza 2021..</Footer>
          </Layout>
        </Layout>
      );
}

function LoadRouters({ routes }) {
  return (
    <Switch>
      {routes.map((routes, index) => (
        <Route
          Key={index}
          path={routes.path}
          exact={routes.exact}
          component={routes.component}
        />
      ))}
    </Switch>
  );
}