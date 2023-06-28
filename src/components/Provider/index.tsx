"use client";
import store from "@/store";
import React from "react";
import { Provider } from "react-redux";
import ActiveStatus from "../ActiveStatus";
import useActiveChannel from "@/app/hook/useActiveChannel";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Providers;
