import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from "react";

export interface IModalRef {
  close: () => void;
}

interface IProps {
  id: string;
}

const Modal = forwardRef<IModalRef, PropsWithChildren<IProps>>((props, ref) => {
  const { children, id } = props;
  const labelRef = useRef<HTMLLabelElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      close() {
        labelRef.current?.click();
      },
    }),
    []
  );

  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label ref={labelRef} htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative w-11/12 max-w-5xl">
          {children}
        </label>
      </label>
    </div>
  );
});

export default Modal;
