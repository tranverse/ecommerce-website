import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './router';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {routes.map((route, index) => {
                        const { Layout, Page } = route;
                        return (
                            <Route
                                path={route.path}
                                key={index}
                                element={
                                    <Layout>
                                        <Page/>
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
