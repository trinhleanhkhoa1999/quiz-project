import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

const Question = ({ data, idx, handleCheckBox }) => {
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  // console.table(data);
  if (_.isEmpty(data)) {
    return <></>;
  }
  const handleHandleCheckBox = (e, aId, qId) => {
    // console.log("cau tra loi thu: ", aId, "cau hoi thu: ", qId);
    handleCheckBox(aId, qId);
  };
  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            src={`data:image/png;base64, ${data.image}`}
            alt=""
            onClick={() => setIsPreviewImage(true)}
          />
          {isPreviewImage && (
            <Lightbox
              image={`data:image/png;base64, ${data.image}`}
              title="Question Image"
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}

      <div className="question">
        Question {idx + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, idx) => {
            return (
              <div className="a-child" key={`${idx}-answers`}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    onChange={(e) =>
                      handleHandleCheckBox(e, a.id, data.questionId)
                    }
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
