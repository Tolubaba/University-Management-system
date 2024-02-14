import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
    })
  return (
    <div>
      error app
    </div>
  )
}

export default Error
