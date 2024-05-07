import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteUser = ({
  show,
  setShow,
  dataDelete,
  currentPage,
  setCurrentPage,
  fetchListUser,
  fetchListUserWithPaginate,
}) => {
  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    console.log(dataDelete.id);
    const data = await deleteUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      //   await fetchListUser();
      setCurrentPage(1);
      await fetchListUserWithPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete The User ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete this user with email = <b>{dataDelete.email}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
