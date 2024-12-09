import React from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from './TopNavigation';

function Dashboard() {

let storeObj = useSelector((store)=>{
    return store;
});

  return (
    <div>
      <TopNavigation></TopNavigation>
        <h2>Dashboard</h2>
        <h3>
          {storeObj.loginDetails.firstName}
          {storeObj.loginDetails.lasName}
          </h3>
          <img src={`https://localhost:4567/${storeObj.loginDetails.profilepic}`}></img>
    </div>
  )
}

export default Dashboard