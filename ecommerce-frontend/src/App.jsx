import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './router';
import { ToastContainer, toast } from 'react-toastify';

function App() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    {routes.map((route, index) => {
                        const { Layout, Page } = route;
                        return (
                            <Route
                                path={route.path}
                                key={index}
                                element={
                                    <Layout {...(route.layoutProps || '')}>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
