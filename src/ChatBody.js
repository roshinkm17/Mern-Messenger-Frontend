import React, {useEffect, useRef} from 'react'
import Message from './Message'

function ChatBody({messages}) {
    const messagesEndRef = useRef(null);
     const scrollToBottom = () => {
       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
     };
     useEffect(() => {
       scrollToBottom();
     }, [messages]);
    return (
      <div className="chat__body">
        {messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
}

export default ChatBody
