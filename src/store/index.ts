import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "./memberSlice";

const store = configureStore({
  reducer: {
    members: memberSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
