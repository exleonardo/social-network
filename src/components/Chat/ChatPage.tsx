import React , {useEffect , useState} from 'react';
import {Button} from "antd";
import {ChatMessage} from "../../API/chat-api";
import {useAppDispatch , useAppSelector} from "../../redux/redux-store";
import {sendMessage , startMessageListening , stopMessageListening} from "../../redux/chat-reducer";
import {getMessages} from "./chat-selector";


export const ChatPage = () => {
  return (
    <div>
      <Chat/>
    </div>
  )
}

export const Messages = () => {

  const messages = useAppSelector ( getMessages )


  return (
    <div style={{ height: '400px' , overflowY: 'auto' }}>{messages.map ( (m , index) => {
      return <Message key={index} message={m.message} userId={m.userId} userName={m.userName} photo={m.photo}/>
    } )}</div>
  )
}


export const Message = ({ photo , message , userName }: ChatMessage) => {

  return (
    <div>
      <img style={{ width: '50px' }} src={photo} alt="ava"/><b>{userName}</b>
      <br/>
      {message}
      <hr/>
    </div>
  )
}

export const AddMessage = () => {
  const [message , setMessage] = useState ( '' )

  const dispatch = useAppDispatch ()

  const sendMessageHandler = () => {
    if ( !message ) {
      return
    }
    dispatch ( sendMessage ( message ) )
    setMessage ( '' )
  }
  return (
    <div>
      <div><textarea onChange={(e) => {
        setMessage ( e.currentTarget.value )
      }} value={message}></textarea></div>
      <div><Button onClick={sendMessageHandler}>send</Button></div>
    </div>

  )
}


export const Chat = () => {


  const dispatch = useAppDispatch ()

  useEffect ( () => {
    dispatch ( startMessageListening () )

    return () => {
      dispatch ( stopMessageListening () )
    }
  } , [] );
  return (
    <div>
      <Messages/>
      <AddMessage/>
    </div>
  )
}


