import * as React from 'react';
import {createRoot} from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { App }  from './main/app';
import theme from './theme';
import UserService from './utils/UserService';
import HttpService from "./utils/HttpService";

const rootElement = document.getElementById('root');
// const root = createRoot(rootElement!);

const renderApp = () => createRoot(rootElement!);

const keycloakPromise = UserService.initKeycloak();
keycloakPromise.then((authenticated: boolean) => {
    if (!authenticated) {
        console.log("user is not authenticated..!");
    }
    console.log("user is logged in!")
    renderApp().render(
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, conse baseline to build upon. */}
            <CssBaseline />
            <App />
        </ThemeProvider>,
    );
}).catch(console.error);
HttpService.configure();
