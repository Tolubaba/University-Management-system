import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context";
import { auth, db } from "./firbaseconfig";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, query, where, doc, orderBy } from "firebase/firestore";
import { assigment } from "./Data";

const Marks = () => {
  const user = auth.currentUser;
  const { assignments, selectedCourses, mode, answers } = useGlobalContext();

  const [answerfilter, setanswerfilter] = useState([]);
  // const query = Query(collection(db, "answers", where("assigmentid" ==)));
  // const [answerSnapshot, answerLoading, answerError] = useDocument(query)

  const courses = selectedCourses.map((item) => item.code.toLowerCase());

  /*const filteredAssignments = assignments.filter((item) => {

  answerfilter= answers.filter((items)=>items.data().assigmentid===item.data().id)
    console.log(answerfilter,'this is')

const courses = selectedCourses.map((item) => item.code.toLowerCase());
 
return courses.includes(item.data().course.toLowerCase());
});
  const filteredAssignmentsRef = useRef(filteredAssignments);

*/

  const [filteredAssignments, setFilteredAssignments] = useState([]);

  useEffect(() => {
    const fetchFilteredAssignments = async () => {
      const newFilteredAssignments = assignments.filter((item) => {
        const newfilter = answers.filter(
          (items) => items.data().assigmentid === item.data().id
        );
        console.log(newfilter);

        const courses = selectedCourses.map((course) =>
          course.code.toLowerCase()
        );
        return courses.includes(item.data().course.toLowerCase());
      });

      setFilteredAssignments(newFilteredAssignments);
    };

    fetchFilteredAssignments();
  }, [assignments, selectedCourses, answers]);

  return (
    <Wrapper>

      <h2> Assignment Report</h2>
      <section>
        <table>
          <thead>
            <tr>
            <th >course</th>
              <th> lecturer</th>
              <th> title</th>
              <th> Lecturer comment</th>
              <th>mark</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments &&
              filteredAssignments.map((item, index) => (
                <Answer
                  key={index}
                  assignment={item.data()}
                  index={index}
                  uid={user?.uid}
                />
              ))}

            {answerfilter > 0 &&
              answerfilter.map((item, index) => {
                console.log(answers);
                return (
                  <tr key={index}>
                    <td> {item.data().answertext}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  font-family: var(--fontfamily);



table {
    width: 100%;
    border-collapse: collapse;
  }

  table th {
    padding: 10px;
    text-align: left;
    background-color: #eef2fb;
    color: black;

    font-size: 15px;
    font-weight: 700;

    

  }


  table td {
    padding: 10px;
    text-transform: capitalize;
    font-size: 14px;
  }
 

  table tr:nth-child(even) {
    background-color: #f8f9fb;
  }




h2{
  margin-bottom:30px;
  font-size: 30px;
    font-weight: 700;
}


`;

const Answer = ({ assignment, index, uid }) => {

  const q = query(
    collection(db, "answers"),
    where("assigmentid", "==", assignment.id),
    where("studentid", "==", uid ?? "0"),
    orderBy("studentid", "desc")
  );

  const [answer, setAnswer] = useState(null);
  const [answerSnapshot, answerLoading, answerError] = useCollection(q);

  useEffect(() => {
    if (answerSnapshot) {
      console.log(answerSnapshot.docs.length, `Size, ${index}`);
      setAnswer(answerSnapshot.docs[0]?.data());
    }
  }, [answerSnapshot]);

  return (
    <tr key={index}>
      <td style={{ textTransform: 'uppercase' }}> {assignment.course}</td>
      <td> {assignment.Lecturer}</td>
      <td> {assignment.title}</td>
      { answer &&  <td> {answer.Lecturercomment} </td>}
      {answer && <td> {answer.mark}</td>}
    </tr>
  );
};

export default Marks;
