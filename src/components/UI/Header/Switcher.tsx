"use client";
import { Switch } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";
import { useTheme } from "next-themes";

const Switcher = () => {
    const { theme, setTheme } = useTheme();

    const handleSwitch = (isSelected: boolean, classname: string): ReactNode => {
        if (isSelected) {
            setTheme("light");
            return <SunIcon className={classname} />;
        } else {
            setTheme("dark");
            return <MoonIcon className={classname} />;
        }
    };

    return (
        <Switch
            defaultSelected={theme === "light"}
            size="md"
            color="primary"
            thumbIcon={({ isSelected, className }) => handleSwitch(isSelected, className)}
        />
    );
};

export default Switcher;
