import React from 'react'
import { styled } from 'styled-components'
import Back from './Back'
import Home from './Home'
import { saveAs } from 'file-saver'
import { useParams } from 'react-router-dom'
import { PeopleWithIds } from './Data'
import { useGlobalContext } from '../Context'
import { useEffect } from 'react'
import pdf from '../images/pdf.jpg'

const Detailmain = () => {



    const {id}=useParams()

    const {detailview,detailselect,infoData,assinfochange}= useGlobalContext();

    useEffect(()=>{
        detailview(id)

    },[])

    const handledownload=()=>{
        const link=document.createElement('a')

        link.href=detailselect.picture
        link.download=`${detailselect.name} file`
        link.click();
        
            }

            return (
    <Wrapper>
        <h2 className='detailinfo'> Assigment information</h2>
        <Back/>

        <section className='detailmain'>
            <div className='detailfirst'>
                <div className='detailprofile'>
                    <img src={detailselect.picture}/>

                    <h3>{detailselect.name}</h3>
                </div>
            </div>


            <div className='detailsecond'>
                <h3>Student Answer:</h3>
                <p>{detailselect.answer}</p>
                <h3> student File:</h3>
                <div className='download' onClick={handledownload}>
                    <img src={pdf}/>

                     </div>

                <h3> Student comment:</h3>
                <p>{detailselect.comment}</p>
                </div>

                <div className='detaillast'>
                    <form>

                        <div className='first'>

                        <div className='text'>
                            <label> Add comment: </label>
                             <textarea value={infoData.comment} name='comment' onChange={assinfochange}>

                            </textarea>

                            </div> 
                            <div className='mark'>
                                <label>mark:</label>
                                <input type="number" className="number"  value={infoData.mark} name='mark' onChange={assinfochange}/>
                                </div> 

                               
                                </div>
                                <div className='divbtn'>
                                <button type='submit'>  save</button>          

                                </div>


                                
                         </form>
                    </div>
        </section>
      
    </Wrapper>
  )
}



const Wrapper=styled.section`
font-family:var(--fontfamily);

.detailmain{
    display:flex;
    flex-direction:column;
    gap:30px;
    margin-top:30px;
}

.detailinfo{
    text-transform:capitalize;
    background-color: #7ba1eb;
    border-radius:2px;
    padding:10px;
    color:white;

}

.detailprofile{
    display:flex;
    align-items:center;
    gap:10px;
    img{
        width:70px;
        height:70px;
        border-radius:100%;
        border:2px solid #8bdbad;
        }

        h3{
            text-transform:capitalize;
        }
}

.detailsecond{
    display:flex;
    flex-direction:column;
    gap:20px;

    h3{
        text-transform:capitalize;
        font-size:17px;
    }
}

.download{
background-color:rgba(0,0,0,0.9);
width:55px;
display:flex;
justify-content:center;
img{
    width:50px;
    height:50px;


}
}

form{
    display:flex;
    flex-direction:column;
    gap:20px;

}

.first{
    display:flex;
    gap:20px;
}

.text{
    display:flex;
    gap:10px;

    flex-direction:column;
    label{
        text-transform:capitalize;
        font-weight:700;
    }
    textarea{
        border: 1.5px solid rgba(0,0,0,0.9);
        outline:none;

        border-radius:4px;
        width:300px;
        height:90px;
        padding:10px;
    }
}

.mark{
    display:flex;
    gap:10px;
    flex-direction:column;
    input{
        border:1.5px solid rgba(0,0,0,0.9);
        outline:none;
        border-radius:4px;
        width:60px;
        height:50px;
        font-size:16px;
        padding-left:10px;
    }

    label{
        text-transform:capitalize;
        font-weight:700;
    }
}

.divbtn{
button{
      background-color: #8bdbad;
      width:60px;
      border:none;
      text-transform:uppercase;
      font-weight:700;
      color:white;
      height:30px;
      border-radius:5px;
      padding:3px;


    }

}
`


export default Detailmain
