import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "flowbite";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { HashLoader } from "react-spinners";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={
          <HashLoader
            size={60}
            color="#3498db"
            loading={true}
            speedMultiplier={1.5}
            cssOverride={{ margin: "auto", display: "block" }}
          />
        }
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
