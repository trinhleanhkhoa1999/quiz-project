import { useState, useEffect } from "react";
import { getQuizByUser } from "../../services/apiServices";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
const ListQuiz = () => {
  const [arrQuiz, setArrQuiz] = useState([]);

  const navigate = useNavigate();

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };

  useEffect(() => {
    getQuizData();
  }, []);

  return (
    <div className="list-quiz-container container">
      {arrQuiz &&
        arrQuiz.map((quiz, idx) => {
          return (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={`${idx}-quiz`}
            >
              <img
                src={`data:image/png;base64, ${quiz.image}`}
                className="card-img-top"
                alt="Error.."
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {idx + 1}</h5>
                <p className="card-text"> {quiz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description },
                    })
                  }
                >
                  Start now
                </button>
              </div>
            </div>
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && (
        <div>You dont have any quiz now...</div>
      )}
    </div>
  );
};

export default ListQuiz;
