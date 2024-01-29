import type {Config} from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            container: {
                padding: {
                    DEFAULT: '1rem',
                    'xl': '20rem'
                }
            },
            transitionProperty: {
                'visibility': 'visibility'
            }
        },
    },
    darkMode: "class",
    plugins: [nextui()]
};
export default config;
