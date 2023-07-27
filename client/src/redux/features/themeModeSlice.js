import { createSlice } from "@reduxjs/toolkit";

export const themeModeSlice = createSlice({
    name: "ThemeMode",
    initialState: {
        themeMode: localStorage.getItem("theme")
            ? localStorage.getItem("theme")
            : "dark",
    },
    reducers: {
        setThemeMode: (state, action) => {
            state.themeMode = action.payload;
            localStorage.setItem("theme", action.payload);
        },
    },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
