import { useEffect, useState } from "react";

const useDarkMode = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const root = window.document.documentElement;
        if(theme === "dark"){
            root.classList.add("dark");
            root.classList.remove("light");
            localStorage.setItem("theme", "dark");
        }
        else{
            root.classList.remove("dark");
            root.classList.add("light");
            localStorage.setItem("theme", "light");
        }

    }, [theme]);

    return [theme, setTheme];
};

export default useDarkMode;