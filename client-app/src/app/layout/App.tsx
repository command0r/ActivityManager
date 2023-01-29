import React, {useEffect} from 'react';
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from 'mobx-react-lite';
import {Outlet} from "react-router-dom";

function App() {
      
  return (
    <div>
      <NavBar />
        <Container style={{marginTop: '7em'}}>
            <Outlet />
        </Container>
    </div>
  );
}

export default observer(App);
