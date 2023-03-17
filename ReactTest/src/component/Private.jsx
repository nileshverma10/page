import React from 'react'
import { Outlet , Navigate} from 'react-router-dom'

const Private = () => {

    const data = localStorage.getItem("token");

  return  data? <Outlet/> : <Navigate to="/login"/>
      
}

export default Private