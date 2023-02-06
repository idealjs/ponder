import { PropsWithChildren } from "react";

interface IProps {
  id: string;
}

const Modal = (props: PropsWithChildren<IProps>) => {
  const { children, id } = props;
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <div className="modal-box w-11/12 max-w-5xl">{children}</div>
      </label>
    </div>
  );
};

export default Modal;
