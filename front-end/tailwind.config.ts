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
            colors: {
                'spotify': {
                    900: '#1db954',
                    800: '#212121',
                    700: '#121212',
                    600: '#535353',
                    500: '#b3b3b3'
                },
                'tangerine': {
                    'front': '#1A1413',
                    'back': '#FE4633'
                },
                'aquamarine': {
                    'front': '#F137A6',
                    'back': '#9CF0E1'
                },
                'kleinblue': {
                    'front': '#4100F6',
                    'back': '#CEF566'
                }
            },
            container: {
                padding: {
                    DEFAULT: '1rem',
                    'xl': '15rem'
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
