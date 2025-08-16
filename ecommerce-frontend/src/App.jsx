import React, { Fragment, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './router';
import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoute from '@router/ProtectedRoute';
function App() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    {routes.map((route, index) => {
                        const { Layout, Page, protected: isProtected, allowRoles = [], type } = route;
                        const element =
                            Layout == null ? (
                                <>
                                    <React.Fragment>
                                        <Page />
                                    </React.Fragment>
                                </>
                            ) : (
                                <>
                                    <Layout {...(route.layoutProps || '')}>
                                        <Page />
                                    </Layout>
                                </>
                            );
                        return (
                            <Route
                                path={route.path}
                                key={index}
                                element={
                                    isProtected ? (
                                        <ProtectedRoute children={element} allowRoles={allowRoles} userType={type} />
                                    ) : (
                                        element
                                    )
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
