"use client"; // Indica que este componente se debe ejecutar en el cliente

import React, { ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary atrapó un error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Oops! Algo salió mal. Intenta recargar la página.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
