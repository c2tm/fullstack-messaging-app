import { useState } from 'react'
import Cookies from 'js-cookie'

function Message({id, content, channelView, deleteMessageLocal, index, loadMessages}) {

    const [editForm, setEditForm] = useState(false);
    const [editInput, setEditInput] = useState(content);
    const [previewContent, setPreviewContent] = useState(content);

    const handleErrors = (err) => {
        console.warn(err);
    }

    const handleEditButton = () => {
        setEditForm(!editForm);
    }

    const handleDeleteClick = () => {
        const deleteMessage = async () => {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },  
            }

            const response = await fetch(`/api/v1/channels/${channelView}/messages/${id}/`, options).catch(handleErrors)

            if(!response.ok) {
            throw new Error('Response was not ok!')
            } else {
                // deleteMessageLocal(index)
                loadMessages()
            }
        }
        deleteMessage()
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const editMessage = async () => {
            const message = {
                content: editInput,
                channel: channelView,
            }
            const options = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: JSON.stringify(message),
            }

            const response = await fetch(`/api/v1/channels/${channelView}/messages/${id}/`, options).catch(handleErrors)

            if(!response.ok) {
            throw new Error('Response was not ok!')
            } else {
                setPreviewContent(editInput)
            }
        }
        editMessage()
        handleEditButton()
    }

    const previewHTML = (
        <div className='message-container'>
            <div className='message' key={id}>{previewContent}</div>
            <div className='message-button-container'>
                <button type='button' onClick={handleEditButton}>Edit</button>
                <button type='button' onClick={handleDeleteClick}>Delete</button>
            </div>  
        </div>  
    )

    const editHTML = (
        <form onSubmit={handleEditSubmit}>
            <input type='text' value={editInput} onChange={(e) => setEditInput(e.target.value)}/>
            <button type='submit'>Save</button>
            <button type='button' onClick={handleEditButton}>Cancel</button>
        </form>
    )

    return (
        editForm ? editHTML : previewHTML  
    )
}

export default Message