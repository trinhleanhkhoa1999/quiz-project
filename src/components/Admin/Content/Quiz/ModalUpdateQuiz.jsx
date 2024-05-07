import _ from "lodash";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";
import { putUpdateQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";

const ModalUpdateQuiz = ({
  show,
  setShow,
  dataUpdateQuiz,
  fetchingAllQuizForAdmin,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setPreviewImage(null);
    setImage(null);
  };

  const handleUploadImage = (e) => {
    console.log("upload img");
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };
  const handleSubmitUpdateQuiz = async () => {
    const res = await putUpdateQuiz(
      dataUpdateQuiz.id,
      name,
      description,
      type,
      image
    );
    if (res && res.EC === 0) {
      fetchingAllQuizForAdmin();
      toast.success(res.EM);
      handleClose();
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdateQuiz)) {
      //update state

      setName(dataUpdateQuiz.name);
      setDescription(dataUpdateQuiz.description);
      setType(dataUpdateQuiz.difficulty);
      setImage("");
      if (dataUpdateQuiz.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
      }
    }
  }, [dataUpdateQuiz]);
  // console.log("check dataUpdateQuiz: ", dataUpdateQuiz);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="uploadImage">
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                id="uploadImage"
                hidden
                onChange={(e) => handleUploadImage(e)}
              />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
