import React, {useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({text, type}) => {
  const notifySuccess = () => toast.success(text);
  const notifyWarn = () => toast.warn(text);
  const notifyError = () => toast.error(text);

  useEffect(() => {
    if (type === 'success') notifySuccess();
    if (type === 'warn') notifyWarn();
    if (type === 'error') notifyError();
  }, []);

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
export default Notification;
