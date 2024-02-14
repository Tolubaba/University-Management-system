import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { doc, collection, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { db } from './firbaseconfig'
import { useGlobalContext } from '../Context'



const Adminpage = () => {

  const [allUsers, setAllUsers] = useState([]);
  const {RegisterData,registersubmit }=useGlobalContext();

  useEffect(() => {
    const q = query(collection(db, "admin"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let tempAllUsers = [];
      querySnapshot.forEach((doc) => {
        tempAllUsers.push(doc.data());
        console.log(doc.data());
      })
      setAllUsers(tempAllUsers);
      console.log("temp users is");
      console.log(tempAllUsers);
      
    });
    return () => unsub();
  }, []);
  return (
    <Wrapper>

      <section className='adminmain'>
        <h2 className='adminh2'>
          admin dashboard
        </h2>

        <section>
          <table className='table'>
            <thead>
        <th> Email </th>
        <th> role</th>
        <th> status</th>
        <th>option</th>


            </thead>
            <tbody>
              {allUsers.map((item,index)=>{


             return<tr key={index}>
              <td>
                  {item.email}
              </td>
              <td>
                {item.role}

              </td>
              <td>
                {item.Regstatus? "Approved" : "Unapproved"}
              </td>

                <td>
                  <button className='approvebtn' onClick={async (e) => {
                    RegisterData.username = item.username;
                    RegisterData.firstname = item.firstname;
                    RegisterData.lastname = item.lastname;
                    RegisterData.email = item.email;
                    RegisterData.password = item.password;
                    RegisterData.role = item.role;
                    RegisterData.phonenumber = item.phonenumber;
                    RegisterData.level = item.level;
                    RegisterData.matricnumber = item.matricnumber;
                    RegisterData.Regstatus = true;

                    try{
                      await updateDoc(doc(db, "admin", item.email), {Regstatus: true});
                    }
                    catch(error){
                      alert(error);
                    }

                    registersubmit(e);

                  }}>Approve</button>
                </td>

             </tr>
              }
              
              
              
              )}
              <tr>

              </tr>
            </tbody>

          </table>



        </section>




      </section>
      
    </Wrapper>
  )
}

export default Adminpage

const Wrapper=styled.section`
font-family:var(--fontfamily);

.adminh2{
text-transform:capitalize;
margin-bottom:70px;
}

.table{
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

.approvebtn{
  width: 80px;
    height: 30px;
    border-radius: 3px;
    font-weight: 700;
    font-size:14px;
    border:1px solid ;
    padding: 0 5px;
    text-transform:capitalize;
    background-color: #8bdbad;
    color:white;
    cursor: pointer;
}


`
