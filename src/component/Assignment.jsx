import React from 'react'
import { styled } from 'styled-components'
import GlobalStyles from './GlobalStyles'
import { entries } from './Data'
import { assigment } from './Data'
import { useReactTable,flexRender,getCoreRowModel} from '@tanstack/react-table'
import { useMemo } from 'react'
import { useGlobalContext } from '../Context'
import { Link } from 'react-router-dom'





const columns=[
    {
        header:'Title',
        accessorKey:'title',
    
         
    },
    {
        header:'level',
        accessorKey:'level',
    
         
    },
    {
        header:'Course',
        accessorKey:'Course',

         
    },
    {
        header:'DueDate',
        accessorKey:'DueDate',
        
         
    },
    /* {
        header:'Options',
        accessorkey:'options',
        footer:'options'
         
    } */
]
const Assignment = () => {

    const {openassmodal,formResponses,view,selected}=useGlobalContext();
    console.log(formResponses);

  

    /**  @type */




 const data= useMemo(()=> assigment,[])
   
const table=useReactTable({data,columns,getCoreRowModel:getCoreRowModel()})



  return (

    <Wrapper>
        <GlobalStyles/>
<section className='assbegin'>
<div className='assmain'>
<h2> Assignment </h2>
<p> Toluwase orogbemi</p>
        </div>

        <div className='assbtn'>
            <button onClick={openassmodal}> add new </button>
        </div>

</section>

<section className='asssecond'>

    <div className='assselect'>
            <label> show</label>
            <select className='asstake'>
                {entries.map((option,index)=>{
                    return <option key={index}>{option.value}

                    </option>
                })}
            </select>
            <p> entries</p>

            </div>

<div className='assinput'>
<label> Search</label>:
<input className='assinputmain' type='text'/>
</div>

</section>

<section className='tablesection'>

<table className='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Level</th>
          <th>Course</th>
          <th>Due Date</th>
          <th> Options</th>
        </tr>
      </thead>
      <tbody>
        {formResponses.map((assignment, index) => (
          <tr key={index}>
            <td>{assignment.id}</td>
            <td>{assignment.title}</td>
            <td>{assignment.level}</td>
            <td>{assignment.course}</td>
            <td className='duedate'> <button>{assignment.date} </button></td>
            <td className='lasttd'>
              <Link to={`/assignmentpage/${assignment.id}`} > <button  className='viewbtn' onClick={()=>view(assignment.id)} >View</button> </Link> 
              
              <button className='deletebtn' >Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>



 { /*<table className='table'>
  <thead>
  
  
    {table.getHeaderGroups().map((headergroup) => (
      <tr key={headergroup.id}>
        {headergroup.headers.map((header) => (
          <th key={header.id}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
    ))}
    </thead>
    <tbody>

    {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
    
</tbody>

  
</table>
              */}
    
</section>
        
      
    </Wrapper>
  )
}




const Wrapper =styled.section`
font-family:var(--fontfamily);

.assbegin{
    display:flex;
    align-items:center;
    justify-content:space-between;
}

.assmain{
    display:flex;
    flex-direction:column;
    gap:10px;
    p{
        text-transform:capitalize;
        font-weight:500;
        font-size:18px;

    }
    h2{
        font-size:30px;
        font-weight:700;
    }
}

.assbtn{
    
    button{
        width:90px;
    height:35px;
    text-transform:uppercase;
    font-size:13px;
    border-radius:5px;
    border:solid 1px #86A6EC;
;

&:hover{
    color:white;
    background-color:#86A6EC;
}
    color:#86A6EC;

    font-size:13px;
    font-weight:700;
    }
}

.assselect{
    display:flex;
    gap:2px;
    text-transform:capitalize;
    font-size:15px;
}

.asssecond{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:30px;
}

.assinput{
display:flex;
gap:5px;
align-items:center;

}

.assinputmain{
    height:30px;
        width:220px;
        outline:none;
}

.table{
    width:100%;
    border-collapse: collapse;

}


.table tr:nth-child(even){background-color:#F8F9FB;}


table th {
  padding:10px;
  text-align: left;
  background-color: #EEF2FB;
  color:black;

  font-size:15px;
  font-weight:700;
  
}

table td{

    padding:10px;
    text-transform:capitalize;
    font-size:14px;
}
.tablesection{
    margin-top:30px;
}
 table button{
    display:block;
 }

/* Style the last td (cell) in each row */
table td:last-child {
  /* Your CSS styles for the last cell */
  display:flex;
  gap:10px;
  align-items:center;
  /* Example background color */
  /* Add any other styles you want for the last cell */
  a{
    text-decoration:none;

  }
}

.viewbtn{
    width:50px;
    height:28px;
    border-radius:3px;
    border: 1px solid #86A6EC;
;
    font-weight:700;
    color:#86A6EC;
    background-color:#ECF0F9;

    &:hover{
        color:white;
        background-color:#86A6EC;
    }
}

.deletebtn{
    width:50px;
    height:28px;
    border-radius:3px;
    border: 1px solid #ED4E51;
    font-weight:700;
    color:#ED4E51;
    background-color:#FDF0F1;

    &:hover{
        color:white;
        background-color:#ED4E51;
    }

}

.duedate button{
    width:100px;
    border-radius:3px;
    font-weight:700;
    color:#ED4E51;
    background-color:#FDF0F1;
    border:none;
    height:30px;
    font-size:12px;
    font-weight:700;

    &:hover{
        color:white;
        background-color:#ED4E51;
    }
}



`
export default Assignment
 