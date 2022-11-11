import { Suspense } from 'react';
import React from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePaths } from './types';

const AppRoutes = (): JSX.Element => (
    <Suspense fallback={<NotFound />}>
        <BrowserRouter>
            <Routes>
                <Route
                    path={RoutePaths.HOME_PAGE}
                    element={<Navigate to={RoutePaths.DEFAULT_MODE} />}
                />
                <Route path={RoutePaths.ADD_NETWORK} element={<AddNetwork />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </Suspense>
);

export default AppRoutes;
