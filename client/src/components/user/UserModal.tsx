import React, { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const modal = document.getElementById("view") as HTMLDialogElement;
    if (isOpen) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [isOpen]);

  return (
    <dialog id="view" className="modal" onClose={onClose}>
      <div className="modal-box p-6 rounded-lg shadow-lg">
        {children}
        <div className="modal-action">
          <button className="btn btn-primary mt-4" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
