import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastifycss";

const ToastContainers = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      transition:Bounce
    />
  );
};

export default ToastContainers;
