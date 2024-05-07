import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = ({ show, setShow, dataResult }) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your Result.....</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Count total: <b>{dataResult.countTotal}</b>
          </div>
          <div>
            Count correct: <b>{dataResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Save
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
