import React, { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = ({ dataQuiz, handleFinishQuiz, setIdx }) => {
  const refDiv = useRef([]);
  const onTimeUp = () => {
    handleFinishQuiz();
  };
  console.log("dataQuiz: ", dataQuiz);

  const getClassQuestion = (idx, question) => {
    //check answered
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (question, idx) => {
    setIdx(idx);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }

    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return;
      }
    }

    refDiv.current[idx].className = "question clicked";
  };
  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, idx) => {
            return (
              <div
                key={`question-number-${idx + 1}`}
                className={getClassQuestion(idx, item)}
                onClick={() => handleClickQuestion(item, idx)}
                ref={(element) => (refDiv.current[idx] = element)}
              >
                {idx + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
