import { useEffect, useState } from "react";
import "./Questions.scss";
import Select from "react-select";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import Lightbox from "react-awesome-lightbox";

import { BsPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

import { AiOutlineMinusCircle } from "react-icons/ai";

import { FaPlusSquare } from "react-icons/fa";

import { RiImageAddLine } from "react-icons/ri";
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
const Questions = () => {
  //data fake
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);

  const [isPreviewImage, setIsPreviewImage] = useState(false);

  const [dataImagePreview, setDataImagePreview] = useState({
    url: "",
    title: "",
  });

  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listQuiz, setListQuiz] = useState([]);

  const handleAddRemoveQuestion = (type, id) => {
    console.log("check type", type, id);
    //ADD new question
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    console.log("check type", type, questionId, answerId);
    //ADD new answer
    let questionsClone = _.cloneDeep(questions);

    if (type === "ADD") {
      const newAnswer = { id: uuidv4(), description: "", isCorrect: false };

      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }

    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);

      let index = questionsClone.findIndex((item) => item.id === questionId);

      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, e) => {
    let questionsClone = _.cloneDeep(questions);

    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);

    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );

      setQuestions(questionsClone);
    }
  };

  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);

    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
    }
    setIsPreviewImage(true);
  };

  const handleSubmitQuestionForQuiz = async () => {
    console.log("check questions: ", questions, selectedQuiz.value);

    // validate choose quiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    // validate answer
    let isValidAnswer = true;
    let indexQ = 0; // index question
    let indexA = 0; // index answer
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }
    if (isValidAnswer === false) {
      toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }

    // validate question

    let isValidQ = true;
    let indexQ1 = 0; // index question
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidQ === false) {
      toast.error(`Not empty description for Question ${indexQ1 + 1}`);
      return;
    }

    // submit question for quiz
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      // submit answers for question
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          q.DT.id,
          answer.description,
          answer.isCorrect
        );
      }
      toast.success("Create Questions and Answer success!");
      setQuestions(initQuestions);
    }
  };

  const fetchingQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      //tao bien newQuiz => che bien data lai de dung cho react select
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  useEffect(() => {
    fetchingQuiz();
  }, []);

  return (
    <div className="question-container">
      <div className="title">Manage Questions</div> <hr />
      <div className="add-new-questions">
        <div className="col-md-6">
          <label className="mb-2">Select Quiz: </label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>

        <div className="mt-3 mb-2"> Add question:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, idx) => {
            return (
              <div className="q-main mb-3" key={question.id}>
                {/* questions-content */}
                <div className="questions-content">
                  {/* //description */}
                  <div className="form-floating description ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                      onChange={(e) =>
                        handleOnChange("QUESTION", question.id, e.target.value)
                      }
                    />
                    <label>Question's {idx + 1} description</label>
                  </div>
                  {/* File Image */}
                  <div className="group-upload">
                    <label htmlFor={`${question.id}`}>
                      <RiImageAddLine className="label-upload" />
                    </label>
                    <input
                      type="file"
                      hidden
                      id={`${question.id}`}
                      onChange={(e) =>
                        handleOnChangeFileQuestion(question.id, e)
                      }
                    />
                    <span>
                      {" "}
                      {question.imageName ? (
                        <span
                          onClick={() => handlePreviewImage(question.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
                  </div>
                  {/* Icon  */}

                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <BsFillPatchPlusFill className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <BsPatchMinusFill className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>

                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, idx) => {
                    return (
                      <div className="answers-content" key={answer.id}>
                        {/* checkbox */}
                        <input
                          className="form-check-input isCorrect"
                          type="checkbox"
                          checked={answer.isCorrect} // value
                          onChange={(e) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              e.target.checked
                            )
                          }
                        />
                        {/* //description answer*/}

                        <div className="form-floating answer-name ">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={answer.description}
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                e.target.value
                              )
                            }
                          />
                          <label>Answer {idx + 1}</label>
                        </div>
                        {/* Icon  */}
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id)
                            }
                          >
                            <FaPlusSquare className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <AiOutlineMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                {/* answers-content */}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => handleSubmitQuestionForQuiz()}
            >
              Save question
            </button>
          </div>
        )}

        {isPreviewImage && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};

export default Questions;
