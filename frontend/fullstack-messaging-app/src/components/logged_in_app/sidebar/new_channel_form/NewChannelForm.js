import { useState } from 'react'
import Cookies from 'js-cookie'
import './NewChannelForm.css'

function NewChannelForm(props) {

    const {channels, setChannels} = props;

    const [userInput, setUserInput] = useState('')

    const handleCancel = () => {
        setUserInput('');
        props.setShowChannelForm(false)
    }

    const handleErrors = (err) => {
        console.warn(err);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const channel = {
            name: userInput
        }
        const newChannel = async () => {

            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: JSON.stringify(channel),
            }

            const response = await fetch('/api/v1/channels/', options).catch(handleErrors)

            if(!response.ok) {
            throw new Error('Response was not ok!')
            }
        }
        newChannel()

        setChannels([...channels, channel])
        setUserInput('');
        props.setShowChannelForm(false)
        
    }

    return (
        <div className="new-channel-form-container" >
            
            <form className='new-channel-form' onSubmit={handleSubmit}>
                <label className='new-channel-form-item'>Create A New Channel</label>
                <input type='text' placeholder='Enter channel name...' className='new-channel-form-item' value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
                <button type='submit' className='new-channel-form-item'>Add Channel</button>
            </form>
            <button type='button' className='cancel-button' onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default NewChannelForm