import React from "react";
import { styled } from "styled-components";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { computerEngineeringcourses, level } from "./Data";
import { Courses } from "./Data";
import { Semester } from "./Data";
import TimePicker from "react-time-picker";
import { useGlobalContext } from "../Context";
import { collection, addDoc } from "firebase/firestore"; 
import { computerEngineeringCourses } from "./Data";

const Addnewassigment = () => {
  const {
    closeassmodal,
    openassmodal,
    handleChange,
    handleFileChange,
    formData,
    formResponses,
    handleSubmit,
  } = useGlobalContext();

  console.log(formData.level)

  const assignmentcourse= computerEngineeringcourses.filter(
    (item) => item.level==formData.level && item.semester == formData.semester
  );

  return (
    <Wrapper>
      <section className="mainbody">
        <div className="mainhead">
          {" "}
          <h2>Add New Assignment </h2>{" "}
          <FaTimes
            style={{ color: "#8bdbad" }}
            onClick={closeassmodal}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <section className="formfirst">
            <div className="assmain">
              <label> Level </label>
              <select
                className="selectass"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              >
                {level.map((option, index) => {
                  return <option key={index}>{option.label}</option>;
                })}
              </select>
            </div>

            <div className="assmain">
              <label> Semester </label>
              <select
                className="selectass"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
              >
                {Semester.map((option, index) => {
                  return <option key={index}>{option.label}</option>;
                })}
              </select>
            </div>
            <div className="assmain">
              <label> Courses </label>
              <select
                className="selectass"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                {assignmentcourse.map((option, index) => {
                  return <option key={index}>{option.code}</option>;
                })}
              </select>
            </div>
          </section>

          <section className="formsecond">
            <div className="title">
              <label className="label"> Title</label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="description">
              <label className="label"> Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="dueend">
              <label>Due End </label>

              <input
                type="date"
                name="date"
                id="date"
                className="selecttake"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="limit">
              <label>Time Limit</label>

              <input
                type="time"
                id="timeInput"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <div className="file">
                <label htmlFor="fileInput">Upload a file</label>
                <input
                  type="file"
                  id="fileInput"
                  name="file"
                  accept=".pdf, .doc, .docx"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </section>

          <div className="create">
            <button
              className="createbtn"
              type="submit"
            >
              create
            </button>
          </div>
        </form>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: white;
  position: fixed;
  width: 100%;
  height: 100vh;
  font-family: var(--fontfamily);
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;

  .mainbody {
    width: 90%;
    background-color: black;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    max-width: 60%;
    overflow-y: auto;
    max-height: 95vh;
  }

  .mainhead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 10px;
  }

  .assmain {
    display: flex;
    width: 100%;
    align-items:center;
    gap:2px;
    label {
      font-size: 14px;
    }
  }

  .selectass {
    width: 100%;
    height: 30px;
    outline: none;
    text-transform:uppercase;
  }

  .formfirst {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    align-items:center;
  }

  .formsecond {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    gap: 30px;

    .title {
      display: flex;
      flex-direction: column;

      input {
        height: 35px;
        outline: none;
        padding-left: 10px;
      }
    }

    .description {
      display: flex;
      flex-direction: column;

      textarea {
        height: 100px;
        outline: none;
        padding-left: 10px;
        padding-top:10px;
      }
    }

    .dueend {
      display: flex;
      flex-direction: column;

      input {
        height: 35px;
        outline: none;
        padding-left: 10px;
      }
    }

    .limit {
      display: flex;
      flex-direction: column;

      input {
        height: 35px;
        outline: none;
        padding-left: 10px;
      }
    }

    .file {
      width: 100%;
      border-radius: 2px;
      outline: none;
      border: solid 1px rgba(0, 0, 0, 0.3);
      height: 40px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      padding-left: 10px;
    }
  }

  max {
    font-size: 15px;
    margin-top: 15px;
  }

  .create {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .createbtn {
    width: 65px;
    height: 30px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #8bdbad;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
  }
`;

export default Addnewassigment;
