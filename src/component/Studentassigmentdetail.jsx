import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Back from "./Back";
import { useGlobalContext } from "../Context";
import { useParams } from "react-router-dom";
import { collection, query, where, doc } from "firebase/firestore";
import { auth, db } from "./firbaseconfig";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

const Studentassigmentdetail = () => {
  const {handlestudentchange ,studentsolution,handlestudentanswerfile, handlestudentsubmit, answers,assignments,editanswer,answergetselected,handleditanswerchange,editanswerwork
  }=useGlobalContext()

  console.log(assignments)

  const { id } = useParams();
  console.log('this is anser ', id)

  const user = auth.currentUser
  const [answer, setAnswer] = useState({})

  const answersRef = collection(db, "answers")
  const q = query(answersRef, where("assigmentid", "==", id), where("studentid", "==",user? user.uid :'x'))
  const [snapshot, loading, error] = useCollection(q)

  useEffect(() => {
    if (snapshot && snapshot.docs.length>0) {

      setAnswer(snapshot.docs[0].data())

}
  }, [snapshot])


console.log(assignments,'assignments')

  let assref=collection(db,'assignments')
  const [assselected,setassselected]=useState({});
  const assquery=doc(assref,id);
  const [assSnapshot,assloading,asserror]=useDocument(assquery)

  useEffect(() => {
    if (assSnapshot) {
      setassselected(assSnapshot.data());
      // console.log(assSnapshot.data(),'data')
    }
  }, [assSnapshot]);

  console.log(assselected)


const selected=assignments.filter((item)=>item.data().id==id)

  useEffect(()=>{
    answergetselected(answer)

  },[answer])

console.log(editanswer)


  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (answer.status === 'True') {
      const timer = setTimeout(() => {
        setEditMode(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [answer.status]);

  
  const handledownload = () => {
    const link = document.createElement("a");

    link.href =assselected.downloadurl;
    link.download = `${assselected.matricnumber} file`;
    link.click();
  };


 

  return (
    <Wrapper>
      <Back />

      {
        selected.map((item)=>(
          <section className="first">
        <p> {item.data().date}</p>
        <p>{item.data().time}</p>
        <p> 
          ASSIGNMENT DESCRIPTION: 
          
         {item.data().description}
        </p>

        <div className="downloadfilediv" onClick={handledownload}>
          <button> download assigment  </button>
        </div>
      </section>
          ))
      }
      
 { 
   editMode?<section>
   <form  onSubmit={(e)=>editanswerwork(e,editanswer.id)}>
     <div className="answertext">
       <textarea name="answertext" value={editanswer.answertext} onChange={handleditanswerchange}></textarea>
     </div>

     <div className="filediv">
       <input type="file"  name="file" accept=".pdf, .doc, .docx"onChange={handlestudentanswerfile} />
     </div>

     <article className="formlast">
     <div className="addcomment">
       <label> Add your comment</label>
       <textarea name="comment" value={editanswer.comment} onChange={handleditanswerchange}></textarea>
     </div>


     <div className="buttondiv">
       <button type="submit">edit</button>
     </div>
     </article>

     
   </form>
 </section>:

<section>
<form onSubmit={(e)=>handlestudentsubmit(e,id)}>
  <div className="answertext">
    <textarea name="answertext" value={studentsolution.answertext} onChange={handlestudentchange}></textarea>
  </div>

  <div className="filediv">
    <input type="file"  name="file" accept=".pdf, .doc, .docx"onChange={handlestudentanswerfile} />
  </div>

  <article className="formlast">
  <div className="addcomment">
    <label> Add your comment</label>
    <textarea name="comment" value={studentsolution.comment} onChange={handlestudentchange}></textarea>
  </div>


  <div className="buttondiv">
    <button type="submit">submit</button>
  </div>
  </article>

  
</form>
</section>


 }
      


      
          </Wrapper>
  );
};

const Wrapper = styled.section`
  font-family: var(--fontfamily);
  margin-top: -30px;

  .first {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    
  }

  .addcomment {
    display: flex;
    flex-direction: column;  
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin-top: 30px;
  }

  .filediv{
    border:1px solid rgba(0,0,0,0.5);
    padding:5px;
    
  }
  .downloadfilediv{
    
    button{
        width:fit-content;
        display:flex;
        justify-content:center;
        align-items:center;
        height:30px;
       width:20%;
        text-transform:capitalize;
        margin:10 10;
        font-weight:700;
        color:white;
        background-color: #8bdbad;
        border:0;
       

    }
  }

  .answertext{
    textarea{
        width:100%;
        height:100px;
        padding:5px;
        outline:none;
        & :focus{
            outline:none;
        }
    }
  }

  .addcomment{
    width:50%;
    display:flex;
    flex-direction:column;
    gap:8px;
    textarea{
        width:100%;
        height:100px;
        outline:none;
        padding:5px;
        & :focus{
            outline:none;
        }
    }
  }

  .formlast{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }

  .buttondiv{
    button{
        width:80px;
        height:30px;
        text-transform:uppercase;
        font-weight:700;
        color:white;
        background-color: #8bdbad;
        border:0;
        border-radius:2px;

    }
  }
`;
export default Studentassigmentdetail;
