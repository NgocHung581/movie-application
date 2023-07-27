/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#ff0000",
                secondary: "#f44336",
                success: "#66bb6a",
            },
            animation: {
                "loading-slide":
                    "2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) 0s infinite normal none running loading",
            },
            keyframes: {
                loading: {
                    "0%": { left: "-35%" },
                    "60%, 100%": { left: "135%" },
                },
            },
            backgroundColor: {
                dark: "#131313",
                light: "#f5f5f5",
                overlay: "#00000080",
            },
            backgroundImage: {
                loading:
                    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
            },
            container: {
                screens: {
                    sm: "640px",
                    md: "768px",
                    lg: "1024px",
                    xl: "1336px",
                },
            },
        },
    },
    plugins: [],
};
