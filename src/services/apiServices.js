import axios from "../utils/axiosCustumize";
const postCreateNewUSer = (email, password, username, role, image) => {
  //submit data form data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

const putUpdateUSer = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};
const deleteUser = (id) => {
  return axios.delete(`api/v1/participant`, { data: { id: id } });
};
const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

//auth
const postLogin = (userEmail, userPassword) => {
  return axios.post("api/v1/login", {
    email: userEmail,
    password: userPassword,
    delay: 3000,
  });
};
const postRegister = (username, email, password) => {
  return axios.post("api/v1/register", { username, email, password });
};
//auth

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (name, description, difficulty, quizImage) => {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.post(`api/v1/quiz`, data);
};
const getAllQuizForAdmin = () => {
  return axios.get(`api/v1/quiz/all`);
};

const deleteQuiz = (idQuiz) => {
  return axios.delete(`api/v1/quiz/${idQuiz}`);
};

const putUpdateQuiz = (id, name, description, difficulty, quizImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("name", name);
  data.append("description", description);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.put("api/v1/quiz", data);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", image);
  return axios.post("api/v1/question", data);
};

const postCreateNewAnswerForQuestion = (
  question_id,
  description,
  correct_answer
) => {
  return axios.post("api/v1/answer", {
    question_id,
    description,
    correct_answer,
  });
};

const postAssignQuiz = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};
const postUpsertQA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};

const postLogout = (email, refresh_token) => {
  return axios.post(`api/v1/logout`, { email, refresh_token });
};
const getOverview = () => {
  return axios.get(`api/v1/overview`);
};
export {
  postCreateNewUSer,
  getAllUsers,
  putUpdateUSer,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  deleteQuiz,
  putUpdateQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQA,
  postLogout,
  getOverview,
};
