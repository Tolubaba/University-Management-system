import React from "react";
import { styled } from "styled-components";
import Back from "./Back";
import Home from "./Home";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";
import { PeopleWithIds } from "./Data";
import { useGlobalContext } from "../Context";
import { useEffect } from "react";
import pdf from "../images/pdf.jpg";
import tolu from "../images/toluimage.jpeg";
import { collection, doc } from "firebase/firestore";
import { auth, db } from "../component/firbaseconfig";

import { useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

const Detailmain = () => {
  const user = auth.currentUser;

  const { id } = useParams();
  console.log(id);

  const {
    detailview,
    detailselect,
    infoData,
    assinfochange,
    answers,
    answergetselected,
    editanswer,
    handlemarkcomment
  } = useGlobalContext();
  console.log(answers.url);

  let answerRef = collection(db, "answers");
  const [answerselecteds, setanswerselecteds] = useState({
    comment: "",
    answertext: "",
  });

  const answerdetail = answers.filter((item) => item.data().id == id);

  const answerQuery = doc(answerRef, id);
  const [answerSnapshot, loading, error] = useDocument(answerQuery);

  useEffect(() => {
    if (answerSnapshot) {
      setanswerselecteds({ ...answerselecteds, ...answerSnapshot.data() });
    }
  }, [answerSnapshot]);

  console.log("this is tolu ", answerselecteds);

  const [userDetail, setUserDetail] = useState({});

  const [userSnapshot, userLoading, userError] = useDocument(
    doc(db, "users", answerselecteds.studentid ?? "x")
  );

  useEffect(() => {
    if (userSnapshot) {
      setUserDetail(userSnapshot.data());
      console.log(`UserDetail: ${userSnapshot.data()}`);
    }
  }, [userSnapshot]);

  const handledownload = () => {
    const link = document.createElement("a");

    link.href =answerselecteds.url;
    link.download = `${answerselecteds.matricnumber} file`;
    link.click();
  };

  console.log(answers, "answers");


  

  return (
    <Wrapper>
      <h2 className="detailinfo"> Assigment information</h2>
      <Back />

      <section className="detailmain">
        {answerdetail.map((item) => (
          <section>
            <div className="detailfirst">
              <div className="detailprofile">
                <img src={userDetail ? userDetail.photoUrl : tolu} />

                <h3>{item.data().name}</h3>
                <h3> {item.data().matricnumber}</h3>
              </div>
            </div>

            <div className="detailsecond">
              <h3>Student Answer:</h3>
              <p>{item.data().answertext}</p>
              <h3> student File:</h3>
              <div
                className="download"
                onClick={handledownload}
              >
                <img src={pdf} />
              </div>

              <h3> Student comment:</h3>
              <p>{item.data().comment}</p>
            </div>
          </section>
        ))}
        <div className="detaillast">
          <form onSubmit={(e)=>handlemarkcomment(e,id)}>
            <div className="first">
              <div className="text">
                <label> Add comment: </label>
                <textarea
                  value={infoData.comment}
                  name="comment"
                  onChange={assinfochange}
                ></textarea>
              </div>
              <div className="mark">
                <label>mark:</label>
                <input
                  type="number"
                  className="number"
                  value={infoData.mark}
                  name="mark"
                  onChange={assinfochange}
                />
              </div>
            </div>
            <div className="divbtn">
              <button type="submit"> save</button>
            </div>
          </form>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  font-family: var(--fontfamily);

  .detailmain {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 30px;
  }

  .detailinfo {
    text-transform: capitalize;
    background-color: #7ba1eb;
    border-radius: 2px;
    padding: 10px;
    color: white;
  }

  .detailprofile {
    display: flex;
    flex-direction: column;
    gap: 15px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 100%;
      border: 2px solid #8bdbad;
    }

    h3 {
      text-transform: capitalize;
    }
  }

  .detailsecond {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;

    h3 {
      text-transform: capitalize;
      font-size: 17px;
    }
  }

  .download {
    background-color: rgba(0, 0, 0, 0.9);
    width: 55px;
    display: flex;
    justify-content: center;
    img {
      width: 50px;
      height: 50px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .first {
    display: flex;
    gap: 20px;
  }

  .text {
    display: flex;
    gap: 10px;

    flex-direction: column;
    label {
      text-transform: capitalize;
      font-weight: 700;
    }
    textarea {
      border: 1.5px solid rgba(0, 0, 0, 0.9);
      outline: none;

      border-radius: 4px;
      width: 300px;
      height: 90px;
      padding: 10px;
    }
  }

  .mark {
    display: flex;
    gap: 10px;
    flex-direction: column;
    input {
      border: 1.5px solid rgba(0, 0, 0, 0.9);
      outline: none;
      border-radius: 4px;
      width: 60px;
      height: 50px;
      font-size: 16px;
      padding-left: 10px;
    }

    label {
      text-transform: capitalize;
      font-weight: 700;
    }
  }

  .divbtn {
    button {
      background-color: #8bdbad;
      width: 60px;
      border: none;
      text-transform: uppercase;
      font-weight: 700;
      color: white;
      height: 30px;
      border-radius: 5px;
      padding: 3px;
    }
  }
`;

export default Detailmain;
