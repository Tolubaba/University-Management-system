import React from 'react'
import { styled } from 'styled-components'
import GlobalStyles from './GlobalStyles'
import { entries } from './Data'

const Assignment = () => {
  return (
    <Wrapper>
        <GlobalStyles/>
<section className='assbegin'>
<div className='assmain'>
<h2> Assignment </h2>
<p> Toluwase orogbemi</p>
        </div>

        <div className='assbtn'>
            <button> add new </button>
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
    border:solid 1px blue;
    color:blue;
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


`
export default Assignment
 