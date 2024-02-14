import React from 'react';
import { styled } from 'styled-components';
import Assignmentinfo from './Assignmentinfo';
import { People } from './Data';
import { PeopleWithIds } from './Data';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../Context';
import { auth } from './firbaseconfig';


const Assignmentreportmain = ({id}) => {

    const user = auth.currentUser;

    console.log(user.uid)

    const {answers}=useGlobalContext()

    const filteredAnswers = answers.filter((item) => (
        // Check if item has a data method and studentid property
        item.data && item.data().assigmentid ==id
      ));
      

    console.log(id)
  return (
    <Wrapper>

    
        <section className='repoermain'> 

            <table className='maintable'>

                <thead>
                    <tr>
                        <th>Name </th>
                        <th> Matric no</th>
                        <th> Dlivery status </th>
                        <th> Assignment detail </th>
                        <th> mark</th>
                    </tr>
                </thead>
                <tbody>

                    {filteredAnswers.map((item,index)=>(
                            <tr key={index}>
                                <td> {item.data().name}</td>
                                <td>{item.data().matricnumber}</td>
                                <td>{item.data().status ? <div className='on-time'>On Time</div> : <div className='late'>Late</div>}</td>
                                <td> <Link to={`/detailmain/${item.data().id}`}>  <div className='detail' > <p>item detail</p></div> </Link></td>
                                <td>{item.data().mark}</td>

                            </tr>
                        
                    ))}
                    

                </tbody>
            </table>

        </section>

      
    </Wrapper>
  )
}



const Wrapper =styled.section`

font-family:var(--fontfamily);

.maintable{
    width:100%;
    border-collapse:collapse;
    margin-top:30px;
    a{
        text-decoration:none;
    }


}

.maintable tr:nth-child(even){background-color:#F8F9FB;}


.maintable th {
    padding:10px;
  text-align: left;
  background-color: #EEF2FB;
  color:black;
  text-align:center;
  text-transform:capitalize;

  font-size:15px;
  font-weight:700;
}

.maintable td{
 padding:10px;
    text-transform:capitalize;
    font-size:14px;
    text-align:center;
}

.on-time, .late{
    color: white;
    width: 80px;
    margin: auto;
    padding: 5px 0;
    border-radius: 5px;
}

.on-time{
    background-color: #8bdbad;
}

.late{
    background-color: #e35959;
}

.detail{
    border: 1px solid #7ba1eb;
    color: #7ba1eb;
    background-color: rgba(123, 161, 235, 0.1);
    width: 100px;
    padding: 5px 0;
    margin: auto;
    border-radius: 5px;
    
}

.detail:hover{
    background-color: #7ba1eb;
    color: white;
}

`


export default Assignmentreportmain
