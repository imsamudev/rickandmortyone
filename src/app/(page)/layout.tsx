"use client";

import React, { ReactNode } from "react";

interface HomeLayoutProps {
    children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
};

export default HomeLayout;
