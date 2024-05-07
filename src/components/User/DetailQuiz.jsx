import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState, useEffect } from "react";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [idx, setIdx] = useState(0);

  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataResult, setDataResult] = useState({});

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    // console.log("check questions: ", res);
    //xu ly tra data ra cho dep bang lodash groupBy
    if (res && res.EC === 0) {
      // raw data nguyen thuy
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `id` property
        .groupBy("id")
        // `key` is group's name (id), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, idx) => {
            if (idx === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          answers = _.orderBy(answers, ["id"], ["asc"]);

          return {
            questionId: key,
            answers,
            questionDescription,
            image,
          };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handlePrev = () => {
    if (idx - 1 < 0) return;
    setIdx(idx - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > idx + 1) setIdx(idx + 1);
  };
  const handleFinishQuiz = async () => {
    console.log(dataQuiz);
    let payload = {
      quizId: +quizId,
      answers: [],
    };

    let answers = [];

    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        question.answers.forEach((a) => {
          if (a.isSelected === true) {
            userAnswerId.push(a.id);
          }
        });

        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answers;
      console.log("final payload: ", payload);
      //submit api
      const res = await postSubmitQuiz(payload);
      console.log("check res: ", res);
      if (res && res.EC === 0) {
        setDataResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        alert("something wrong.....");
      }
    }
  };
  const handleCheckBox = (answerId, questionId) => {
    // clone dataQuiz
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  return (
    <div className="content-quiz-container ">
      <div className="left-content">
        <div className="title">
          Quiz-{quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img src="" alt="" />
        </div>

        <div className="q-content">
          {/* component child Question */}
          <Question
            idx={idx}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[idx] : []}
            handleCheckBox={handleCheckBox}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent
          dataQuiz={dataQuiz}
          handleFinishQuiz={handleFinishQuiz}
          setIdx={setIdx}
        />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataResult={dataResult}
      />
    </div>
  );
};

export default DetailQuiz;
