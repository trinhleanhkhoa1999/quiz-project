import { useEffect, useState } from "react";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  getAllUsers,
  postAssignQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";

const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const fetchingQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      //tao bien newQuiz => che bien data lai de dung cho react select
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const fetchingUser = async () => {
    const res = await getAllUsers();
    // console.log("res ", res);
    if (res && res.EC === 0) {
      //tao bien newQuiz => che bien data lai de dung cho react select
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListQuiz(newQuiz);
      setListUser(newQuiz);
    }
  };

  const handleAssignQuiz = async () => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    console.log("check res: ", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    fetchingQuiz();
    fetchingUser();
  }, []);

  return (
    <div className="assign-quiz-container row">
      <div className="col-md-6 form-group">
        <label className="mb-2">Select Quiz: </label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>

      <div className="col-md-6 form-group">
        <label className="mb-2">Select User: </label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div>
        <button
          className="btn btn-warning mt-3"
          onClick={() => handleAssignQuiz()}
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
