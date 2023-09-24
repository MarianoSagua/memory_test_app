import ReactDOM from "react-dom/client";
import "./styles.scss";
import { MemoApp } from "./MemoApp";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./Redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <MemoApp />
      <ToastContainer />
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>
);
