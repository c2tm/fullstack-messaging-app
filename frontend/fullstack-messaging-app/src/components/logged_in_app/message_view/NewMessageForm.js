import { useState } from "react"
import Cookies from 'js-cookie'

function NewMessageForm(props) {

const {channelView, setMessages, messages, channelName, loadMessages} = props;

const [messageInput, setMessageInput] = useState('');

const handleErrors = (err) => {
    console.warn(err);
}

const handleSubmit = (event) => {

    event.preventDefault();

    const message = {
        content: messageInput,
        channel: channelView,
    }
    const newMessage = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(message),
        }

        const response = await fetch(`/api/v1/channels/${channelView}/messages/`, options).catch(handleErrors)

        if(!response.ok) {
        throw new Error('Response was not ok!')
        } else {
            loadMessages();
        }
    }
    newMessage();
}

    return (
        <form className="new-message-form" onSubmit={handleSubmit}>
            <input type='text' placeholder="Type new message here..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
    )   
}

export default NewMessageForm;