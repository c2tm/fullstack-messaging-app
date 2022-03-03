import {useEffect, useState} from 'react'
import './MessageView.css'
import NewMessageForm from './NewMessageForm';
import Message from './Message'

function MessageView(props) {

    const {messages, setMessages, channelView, channelName} = props;

    if(!messages) {
        
        return (
            <div className='message-view-container'>
                <h1 className='pre-channel-h1'>Select a channel...</h1>
            </div> 
        )
    }

    const handleErrors = (err) => {
        console.warn(err);
    }

    const loadMessages = async () => {
        const response = await fetch(`/api/v1/channels/${channelView}/messages/`).catch(handleErrors)
            if(!response.ok) {
                throw new Error('Network response was not ok!')
            } else {
                const data = await response.json();
                setMessages(data)
            }
    }

    const deleteMessageLocal = (id) => {
        let newMessageList = [...messages]; 
        const targetMessage = newMessageList.find(message => message.id = id)
        const index = newMessageList.indexOf(targetMessage)
        newMessageList.splice(index, 1);
        setMessages(newMessageList);
    }

    console.log(messages)

    const messageListHTML = messages.map((message, index) => (
         <Message id={message.id} username={message.username} content={message.content} channelView={channelView} index={index} deleteMessageLocal={deleteMessageLocal} loadMessages={loadMessages}/>
    ))

    return (
        <div className='message-view-container'>
            <div className='message-view'>
                <h1 className='channel-name'>{channelName}</h1>
                <div className='message-container'>
                    {messageListHTML}
                    <NewMessageForm channelView={channelView} setMessages={setMessages} messages={messages} channelName={channelName} loadMessages={loadMessages}/>
                </div> 
            </div>       
        </div>
    )
}

export default MessageView