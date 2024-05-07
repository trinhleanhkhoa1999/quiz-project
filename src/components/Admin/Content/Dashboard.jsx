import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.scss";
import { getOverview } from "../../../services/apiServices";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [dataChart, setDataChart] = useState([]);
  const [dataOverview, setDataOverview] = useState([]);

  const fetchDataOverview = async () => {
    const res = await getOverview();
    console.log(res);
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      let Qz = 0,
        Qs = 0,
        As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;

      As = res?.DT?.others?.countAnswers ?? 0;

      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ];
      setDataChart(data);
    }

    console.log(res);
  };
  useEffect(() => {
    fetchDataOverview();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>
      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">Total users</span>
            <span className="text-2"> {dataOverview?.users?.total}</span>
          </div>
          <div className="child">
            <span className="text-1">Total Quizzes</span>
            <span className="text-2">{dataOverview?.others?.countQuiz}</span>
          </div>
          <div className="child">
            <span className="text-1">Total Questions</span>
            <span className="text-2">
              {dataOverview?.others?.countQuestions}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Answers</span>
            <span className="text-2">{dataOverview?.others?.countAnswers}</span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Qz"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="Qs"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
              <Bar
                dataKey="As"
                fill="#ccc393"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
