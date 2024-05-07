import { useState } from "react";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = ({ listQuiz, fetchingAllQuizForAdmin }) => {
  const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false);
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});

  const [isShowModalUpdateQuiz, setIsShowModalUpdateQuiz] = useState(false);
  const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});

  const handleBtnDeleteQuiz = (quiz) => {
    setIsShowModalDeleteQuiz(true);
    setDataDeleteQuiz(quiz);
  };

  const handleBtnUpdateQuiz = (quiz) => {
    setIsShowModalUpdateQuiz(true);
    setDataUpdateQuiz(quiz);
  };
  return (
    <>
      <h1>List Quiz:</h1>
      <table className="table table-bordered  table-hover my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, idx) => {
              return (
                <tr key={`table-quiz-${idx + 1}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  {/* <td>{item.image}</td> */}
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleBtnUpdateQuiz(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger "
                      onClick={() => handleBtnDeleteQuiz(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalDeleteQuiz
        show={isShowModalDeleteQuiz}
        setShow={setIsShowModalDeleteQuiz}
        dataDeleteQuiz={dataDeleteQuiz}
        fetchingAllQuizForAdmin={fetchingAllQuizForAdmin}
      />
      <ModalUpdateQuiz
        show={isShowModalUpdateQuiz}
        setShow={setIsShowModalUpdateQuiz}
        dataUpdateQuiz={dataUpdateQuiz}
        fetchingAllQuizForAdmin={fetchingAllQuizForAdmin}
      />
    </>
  );
};

export default TableQuiz;
