import React from "react";

const ConfirmationModal = ({
  showModal,
  handleClose,
  handleConfirm,
  title,
}) => {
  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      tabIndex="-1"
      style={{
        display: showModal ? "block" : "none",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <h6>{title}</h6>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
