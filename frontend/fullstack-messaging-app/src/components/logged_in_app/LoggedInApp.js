import { useEffect, useState } from 'react';
import './LoggedInApp.css'
import MessageView from './message_view/MessageView';
import Sidebar from './sidebar/Sidebar';

function LoggedInApp() {

  const [messages, setMessages] = useState(null);
  const [channelView, setChannelView] = useState(1);
  const [channelName, setChannelName] = useState('');

  return (
    <div className="LoggedInApp">
      <Sidebar setMessages={setMessages} setChannelView={setChannelView} setChannelName={setChannelName} channelView={channelView}/>
      <MessageView messages={messages} setMessages={setMessages} channelView={channelView} channelName={channelName}/>
    </div>
    
  );
}

export default LoggedInApp;