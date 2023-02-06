import Modal from "../components/Modal";

const CreateActionModal = () => {
  const id = "create-action-modal";
  return (
    <Modal id={id}>
      <h3 className="font-bold text-lg">
        Congratulations random Internet user!
      </h3>
      <p className="py-4">
        You've been selected for a chance to get one year of subscription to use
        Wikipedia for free!
      </p>
      <div className="modal-action">
        <label htmlFor={id} className="btn">
          Yay!
        </label>
      </div>
    </Modal>
  );
};

export default CreateActionModal;
