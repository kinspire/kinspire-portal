import React from "react";
import { NativeRouter } from "react-router-native";
import { store } from "./src/store";
import { Provider } from "react-redux";
import App from "./src/App";

const Index: React.FC = () => {
  return (
    <Provider store={store}>
      <NativeRouter>
        <App />
      </NativeRouter>
    </Provider>
  );
};

export default Index;
