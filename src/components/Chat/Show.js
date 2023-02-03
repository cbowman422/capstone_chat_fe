import React from 'react'
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getUserToken } from '../../utils/authToken'
import '../../css/Show.css'

import Header from '../Header/Header'
import Rooms from './Rooms'


const Show= ({currentUser, socket, isAuthenticated, signOutHandler, signOut})=>
{
  //set state for chat details and form changes for UPDATE ROUTE
  const [chat, setChat]= useState(null);
  const [editForm, setEditForm] = useState(chat);

  // take in the ID parameter from router URL linked from chat.jsx
  const {id} = useParams();

  // useNavigate returns an imperative method that you can use for changing location.
  const navigate = useNavigate();

  // sets chat show route URL as variable and dependent ID from useParams
  const URL = `https://capstone-chat.herokuapp.com/chat/${id}`;

  // event handler for when UPDATE name and title are changed
  const handleChange= (e)=>
  {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  // function to fetch show chat details for useEffect - and set chat detail JSON to setChat and setEditForm State
  const getChat= async()=>
  {
    try
    {
      const response = await fetch(URL);// fetch
      const foundChat = await response.json();
      setChat(foundChat); // set state to Chat detail result
      setEditForm(foundChat);
    }catch(err)
    {
      console.log(err);
    }
  }
  
  // Update Chat function with Authorization header - UPDATE
  const updateChat= async(e)=>
  {
   // prevent default (event object method)
    e.preventDefault()
    
    try
    { 
      const options = {
        method: "PUT",
        headers: {
          'Authorization': `bearer ${getUserToken()}`,
          "Content-Type": "application/json"},
        body: JSON.stringify(editForm)
      }
      
      const response= await fetch(URL, options);
      const updatedChat= await response.json();
      console.log(updatedChat)
      setChat(updatedChat);
      setEditForm(updatedChat);
      navigate(`/room/${chat.chatRoomUserTwo}`);
    }catch(err)
    { 
      console.log(err)
      navigate(`/room/undefined`)
    }
  }

  // Remove Chat function with Authorization header - DELETE
  const removeChat= async(e)=>
  {
    try
    {
      const options= 
      {
        method: "DELETE",
        headers: {
          'Authorization': `bearer ${getUserToken()}`},
          "Content-Type": "application/json"
      }
      const response= await fetch(URL, options);
      const deletedChat= await response.json();
    
      navigate(`/room/${deletedChat.chatRoomUserTwo}`);
    }catch(err)
    {
      console.log(err)
      navigate(`/room/undefined`)
    }
  }

  // useEffect to get fire getChat function on page load
  useEffect(()=>{getChat()}, [])

  // Show Details Loaded function and JSX
  const loaded= ()=>
  {
   
      return(
        <>
        <section>
        <Link to={`/room/${chat.chatRoomUserTwo}`}>
        <h1> &#60; </h1>
        </Link>
          <div className="chat">
            {/* <h2>{chat.textChat}</h2> */}
            <div>
            </div>
          </div>
        </section>
        <section>
          <h2>Edit message  :</h2>
          <form onSubmit={updateChat}>
            <textarea
                type="text"
                value={editForm.textChat}
                rows = "5" 
                cols = "60"
                name="textChat"
                placeholder="textChat"
                onChange={handleChange}
            />
            <input type="submit" value="Update Message" />
          </form> 
          <button className="delete" onClick={removeChat}>
                Delete Message
          </button>
        </section>
        </>
      )
    
  }

  // Show Loading and JSX
  const loading= ()=>
  {
    return(
      <section className="loading">
        <h1>
          Loading...
        </h1>
      </section>
    )
  }


  function signOutHandler(){
    signOut()
    }


  // returned conditional functions and JSX
  return (
  <div className={"showGrid"}>

    <Header loggedIn={isAuthenticated} signOut={signOutHandler} currentUser={currentUser} />
    <Rooms currentUser={currentUser} socket={socket} />

  <section className={"showComponent"}>
    {chat ? loaded() : loading()}
  </section>
  </div>
  )
}

export default Show


