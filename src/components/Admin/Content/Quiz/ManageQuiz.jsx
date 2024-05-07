import { useEffect, useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  postCreateNewQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import { Accordion } from "react-bootstrap";
import Questions from "../Question/Questions";
import AssignQuiz from "./AssignQuiz";
import QuizQA from "./QuizQA";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);

  const [listQuiz, setListQuiz] = useState([]);
  const fetchingAllQuizForAdmin = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  useEffect(() => {
    fetchingAllQuizForAdmin();
  }, []);

  const handleChangeFile = (e) => {
    console.log("upload img");
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmitQuiz = async () => {
    //validate
    if (!name || !description) {
      toast.error("Name/Decription is required");
      return;
    }

    // call api
    const res = await postCreateNewQuiz(name, description, type?.value, image);
    console.log("check res: ", res);
    if (res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      setImage(null);
    } else {
      toast.error(res.EM);
    }
    fetchingAllQuizForAdmin();
  };
  return (
    <div className="quiz-container">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="title">Manage Quizzes</div>
          </Accordion.Header>
          <Accordion.Body>
            <fieldset className="border rounded p-2">
              <legend className="float-none w-auto p-2">Add new Quiz:</legend>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your quiz name..."
                />
                <label>Name</label>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>Description</label>
              </div>

              <div className="my-3">
                <Select
                  value={type}
                  defaultValue={type}
                  onChange={setType}
                  options={options}
                  placeholder="Quiz type..."
                />
              </div>

              <div className="more-actions form-group">
                <label className="mb-1"> Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleChangeFile(e)}
                />
              </div>
              <div className="mt-3 d-grid gap-2 col-6 mx-auto">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => handleSubmitQuiz()}
                >
                  Save
                </button>
              </div>
            </fieldset>

            <div className="list-detail">
              <TableQuiz
                listQuiz={listQuiz}
                fetchingAllQuizForAdmin={fetchingAllQuizForAdmin}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div className="title">Update Q/A</div>
          </Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <div className="title">Assign to User</div>
          </Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
