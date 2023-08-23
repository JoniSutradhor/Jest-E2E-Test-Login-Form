import React from "react";
import {BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from "notistack";
import Login from "./components/login/Login";
function App() {
    return (
        <BrowserRouter>
            <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoHideDuration={3000}
            >
                <Login />
            </SnackbarProvider>
        </BrowserRouter>
    );
}

export default App;
