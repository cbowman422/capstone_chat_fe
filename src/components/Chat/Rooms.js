import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

const Rooms = () => {

   
  const [room, setRoom] = useState()

    // API BASE URL to mongodb backend 
    const BASE_URL= "https://capstone-chat.herokuapp.com/profile";

    // useEffect to store Chat JSON as setChat state
    const getProfile= async()=>
    {
      try
      {
        const res= await fetch(BASE_URL)
        const allProfile= await res.json()

        // console.log(allProfile)
        let oderedRoomListNumber = []
        let len = allProfile.length
        for (let i=0; i < len; i++) {
          if (allProfile[i].usernameProfile[0].toLowerCase()==='a'){
            oderedRoomListNumber.push(1)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='b'){
            oderedRoomListNumber.push(2)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='c'){
            oderedRoomListNumber.push(3)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='d'){
            oderedRoomListNumber.push(4)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='e'){
            oderedRoomListNumber.push(5)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='f'){
            oderedRoomListNumber.push(6)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='g'){
            oderedRoomListNumber.push(7)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='h'){
            oderedRoomListNumber.push(8)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='i'){
            oderedRoomListNumber.push(9)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='j'){
            oderedRoomListNumber.push(10)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='k'){
            oderedRoomListNumber.push(11)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='l'){
            oderedRoomListNumber.push(12)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='m'){
            oderedRoomListNumber.push(13)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='n'){
            oderedRoomListNumber.push(14)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='o'){
            oderedRoomListNumber.push(15)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='p'){
            oderedRoomListNumber.push(16)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='q'){
            oderedRoomListNumber.push(17)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='r'){
            oderedRoomListNumber.push(18)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='s'){
            oderedRoomListNumber.push(19)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='t'){
            oderedRoomListNumber.push(20)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='u'){
            oderedRoomListNumber.push(21)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='v'){
            oderedRoomListNumber.push(22)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='w'){
            oderedRoomListNumber.push(23)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='x'){
            oderedRoomListNumber.push(24)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='y'){
            oderedRoomListNumber.push(25)
          }
          if (allProfile[i].usernameProfile[0].toLowerCase()==='z'){
            oderedRoomListNumber.push(26)
          }
          }
        // console.log(oderedRoomListNumber)
        for (let j=0; j < len; j++) {
          for (let k=0; k < len; k++) {
            if (oderedRoomListNumber[k] > oderedRoomListNumber[k + 1]) {
              let temp = oderedRoomListNumber[k];
              let temp2 = allProfile[k];
              oderedRoomListNumber[k] = oderedRoomListNumber[k + 1];
              allProfile[k] = allProfile[k + 1];
              oderedRoomListNumber[k + 1] = temp;
              allProfile[k + 1] = temp2;
          }
          }
        }
        // console.log(oderedRoomListNumber)
        setRoom(allProfile)
      }catch(err)
      {
        console.log(err)
      }
    }
  

    useEffect(()=>{getProfile();}, [])

  return (
      <>
      <h2> Rooms </h2>
      <Link to={'/room/LivePublicChatRoom'}>
      <h3>Live Public Chat Room!</h3>
      </Link>
  {room?.map((roomMap) =>
  {
    return(
      <div key={roomMap._id}>
        <Link to={`/room/${roomMap.usernameProfile}`}>
        <p>{roomMap.usernameProfile}</p>
        </Link>
      </div>
    )
  }
  )
  } 
      </>
    )

  
}

export default Rooms