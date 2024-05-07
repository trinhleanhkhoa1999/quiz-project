import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiServices";

const ModalDeleteQuiz = ({
  show,
  setShow,
  dataDeleteQuiz,
  fetchingAllQuizForAdmin,
}) => {
  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    // call api
    const res = await deleteQuiz(dataDeleteQuiz.id);
    console.log("check res : ", res);
    fetchingAllQuizForAdmin();
    handleClose();
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete The Quiz ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete this user with name is{" "}
          <b>{dataDeleteQuiz.name}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleSubmitDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
