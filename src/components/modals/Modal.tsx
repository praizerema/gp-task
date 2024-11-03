import { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}
export const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed bg-gray-500/50 w-full top-0 left-0 bottom-0 flex flex-col justify-center px-4 transition-event z-20 ${isOpen ? "opacity-100" : "opacity-0"}`}
    >
      <div className="w-full max-w-[41.9rem] bg-white rounded-[2rem] shadow-md mx-auto">
        <div className="bg-modal-linear flex justify-between items-center rounded-t-[2rem] px-8 py-5">
          <h6 className="h6-font text-white">{title}</h6>
          <button
            className="text-gray-500 text-2xl hover:text-3xl transition-event h-10"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="pb-20 px-12 pt-10">
           {children}
        </div>
       
      </div>
    </div>
  );
};

export default Modal;
