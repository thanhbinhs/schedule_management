// src/client/pages/page.jsx

import { UserProvider } from '@/client/contexts/UserContext';
import ClientPage from '@/client/pages/ClientPage';
import React from 'react';

const Page = () => {
    return (
        <UserProvider>

            <ClientPage/>
        </UserProvider>
    );
}

export default Page;
