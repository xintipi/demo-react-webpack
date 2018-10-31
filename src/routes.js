import React from 'react';
import MessagePage from './pages/MessagePage';
import ConfirmPage from './pages/ConfirmPage';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <MessagePage />
    },
    {
        path: '/confirm',
        exact: false,
        main: () => <ConfirmPage />
    }
];

export default routes;