import React, {useState} from 'react'

function Status({setStudents, student, num, updateStatus}) {
    const [prevElement, setPrevElement] = useState(null);
  
    function changeStatus(name, status, prevElem, id) {
      if (prevElement) {
          prevElement.style.backgroundColor = "white";
        prevElement.id = "";
      }
      setPrevElement(prevElem);

      updateStatus(name, status, id);
    }
  return (
    <tr style={{backgroundColor: `${num%2 === 0? "white":"#F8F9FB"}`}}>
              <td className='status-student-name'>{student.name}</td>
              <td className="statuses">
                {/* <label htmlFor="present" className="present" onClick={changeStatus}><input type="radio" name={student.name} className='presentstatus' />Present</label>
                    <label htmlFor="late" className="late" onClick={changeStatus}><input type="radio" name={student.name} className='latestatus' />Late</label>
                    <label htmlFor="absent" className="absent" onClick={changeStatus}><input type="radio" name={student.name} className='absentstatus' />Absent</label>
                    <label htmlFor="sick" className="sick" onClick={changeStatus}><input type="radio" name={student.name} />Sick</label>
                    <label htmlFor="permit" className="permit" onClick={changeStatus}><input type="radio" name={student.name} />Permit</label> */}
                <div
                  className="status present"
                  onClick={(e) => {
                    (e.target.style.backgroundColor = "#53DD94"),
                    e.target.id = "active-status",
                      changeStatus(student.name, "present", e.target, student.id);
                  }}
                >
                  <div className="circle" onClick={(e) => e.stopPropagation()}></div>Present
                </div>
                <div
                  className="status late"
                  onClick={(e) => {
                    (e.target.style.backgroundColor = "#E2DE7B"),
                    e.target.id = "active-status",
                      changeStatus(student.name, "late", e.target, student.id);
                  }}
                >
                  <div className="circle" onClick={(e) => e.stopPropagation()}></div>Late
                </div>
                <div
                  className="status absent"
                  onClick={(e) => {
                    (e.target.style.backgroundColor = "#E35959"),
                    e.target.id = "active-status",
                      changeStatus(student.name, "absent", e.target, student.id);
                  }}
                >
                  <div className="circle" onClick={(e) => e.stopPropagation()}></div>Absent
                </div>
                <div
                  className="status sick"
                  onClick={(e) => {
                    (e.target.style.backgroundColor = "#E3AD59"),
                    e.target.id = "active-status",
                      changeStatus(student.name, "sick", e.target, student.id);
                  }}
                >
                  <div className="circle" onClick={(e) => e.stopPropagation()}></div>Sick
                </div>
                <div
                  className="status permit"
                  onClick={(e) => {
                    (e.target.style.backgroundColor = "#aaaaaa"),
                    e.target.id = "active-status",
                      changeStatus(student.name, "permit", e.target, student.id);
                  }}
                >
                  <div className="circle" onClick={(e) => e.stopPropagation()}></div>Permit
                </div>
              </td>
            </tr>
  )
}

export default Status
