'use client'

import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {useState} from "react";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <h1>Sorry.. there was an error</h1>;
        }
        return this.props.children;
    }
}


function ButtonWrapper(
    {children}: {children: ReactNode}
) {
    const [pop, setPop] = useState(false)
    const [message, setMessage] = useState(['Title', 'describe'])

    return <Popover isOpen={pop}>
        <PopoverTrigger>
            <div onMouseLeave={() => setPop(false)}>
                {children}
            </div>
        </PopoverTrigger>
        <PopoverContent>
            <div className="px-1 py-2">
                <div className="text-small font-bold">{message[0]}</div>
                <div className="text-tiny">{message[1]}</div>
            </div>
        </PopoverContent>
    </Popover>
}