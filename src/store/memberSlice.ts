import { Channel, Members } from "pusher-js";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IMembersList {
  members: string[];
}
const initialState: IMembersList = {
  members: [],
};

export const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    set: (state, action) => ({
      members: action.payload,
    }),
    
    add: (state, action) => ({
      members: [...state.members, action.payload],
    }),
    remove: (state, action) => ({
      members: state.members.filter(
        (membersId) => membersId !== action.payload
      ),
      
    }),
  },
});
export const { add, remove, set } = memberSlice.actions;
export default memberSlice.reducer;
