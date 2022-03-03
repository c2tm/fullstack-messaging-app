import {useEffect, useState, useRef} from 'react';
import './Sidebar.css';
import NewChannelForm from './new_channel_form/NewChannelForm';
function Sidebar(props) {

const {setMessages, setChannelName, setChannelView, channelView} = props;

const [showChannelForm, setShowChannelForm] = useState(false);
const [channels, setChannels] = useState(null);

let interval = useRef(null);

const handleClick = () => {
    setShowChannelForm(!showChannelForm);
  }

const handleErrors = (err) => {
    console.warn(err);
}

useEffect(() => {
        
        const getChannels = async () => {
            
            const response = await fetch('/api/v1/channels/').catch(handleErrors)
            if(!response.ok) {
                throw new Error('Network response was not ok!')
            } else {
                const data = await response.json();
                setChannels(data)
                
            }

        }
        getChannels();
        setInterval(getChannels, 10000);
    
}, [])

if (!channels) {
    return <div>Fetching Data...</div>
  }

const handleChannelClick = (channel) => {
    clearInterval(interval.current)
    const loadMessages = async () => {
        const response = await fetch(`/api/v1/channels/${channel.id}/messages/`).catch(handleErrors)
            if(!response.ok) {
                throw new Error('Network response was not ok!')
            } else {
                const data = await response.json();
                console.log(data)
                setMessages(data)
                setChannelName(channel.name)
                setChannelView(channel.id)
            }
    }
    loadMessages();
    interval.current = setInterval(loadMessages, 10000)
}

const channelListHTML = channels.map(channel => (
    <li className='list-item' key={channel.id}>
        <button className='channel-name' onClick={() => handleChannelClick(channel)}>
            {channel.name}
        </button>
    </li>
))

    return (
        <div>
            <div className='sidebar-container'>
                {!showChannelForm ? <button type="button" onClick={handleClick}>Add New</button> : null}
                {showChannelForm ? <NewChannelForm setShowChannelForm={setShowChannelForm} setChannels={setChannels} channels={channels}/> : null}
                <ul className='list-of-channels'>
                    {channelListHTML}
                </ul>
            </div>
            
        </div>
    )
}

export default Sidebar