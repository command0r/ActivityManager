import React, {useEffect} from 'react';
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import {observer} from 'mobx-react-lite';
import {Outlet, useLocation} from "react-router-dom";
import HomePage from "../../features/home/HomePage";

function App() {
    // Path of what's inside the URL
    const location = useLocation();     
    
    return (
        <>
            {location.pathname === '/' ? <HomePage /> : (
                <>
                    <NavBar/>
                    <Container style={{marginTop: '7em'}}>
                        <Outlet/>
                    </Container>
                </>
            )}
        </>
    );
}

export default observer(App);
