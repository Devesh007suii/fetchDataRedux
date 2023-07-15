import {configureStore} from "@reduxjs/toolkit"
import todoSlice from "./slice/data.js"

export const store = configureStore({
    reducer:{
      todo: todoSlice,
    },
});