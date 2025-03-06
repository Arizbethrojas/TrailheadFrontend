import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from 'react-autosuggest';
import '../styles/chat.css'; // Importing the styles for the chat

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [recipient, setRecipient] = useState('');
  const [activeUsers, setActiveUsers] = useState([]); // Users with whom the current user has messages
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    setActiveUsers(getActiveUsers(messages, user.username)); // Update active users when messages change
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${apiUrl}/get_messages/`);
      const data = await response.json();
      if (data.messages) {
        setMessages(data.messages);
      } else {
        setError('Failed to fetch messages');
      }
    } catch (error) {
      setError('Error fetching messages: ' + error.message);
    }
  };

  // Get active users based on filtered messages
  const getActiveUsers = (messages, currentUser) => {
    const users = new Set();
    messages.forEach(msg => {
      if (msg.sender === currentUser && msg.receiver) {
        users.add(msg.receiver); // Add receiver if currentUser is sender
      } else if (msg.receiver === currentUser && msg.sender) {
        users.add(msg.sender); // Add sender if currentUser is receiver
      }
    });
    return Array.from(users);
  };

  const fetchSuggestions = async (value) => {
    if (value.length === 0) {
      setSuggestions([]); // Clear suggestions if the input is empty
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/api/students/?search=${value}`, {
        headers: {
          'Authorization': `Bearer ${user.authToken}`,
          'Content-Type': 'application/json'
        }
      });
      setSuggestions(response.data); // Set received suggestions in the state
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const sendMessage = async () => {
    if (!messageInput || !recipient) return; // Don't send empty messages or without a recipient

    const data = {
      message: messageInput,
      sender: user.username,
      receiver: recipient,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${apiUrl}/send_message/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setStatusMessage('Message sent successfully!');
        setMessageInput('');
        setRecipient(''); // Reset recipient after sending
        fetchMessages(); // Refresh messages
      } else {
        setError(result.message || 'Error sending message');
      }
    } catch (error) {
      setError('Error sending message: ' + error.message);
    }
  };

  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleRecipientChange = (e, { newValue }) => {
    setRecipient(newValue);
  };

  const onSuggestionFetchRequested = ({ value }) => {
    fetchSuggestions(value);
  };

  const onSuggestionClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Enter recipient's name",
    value: recipient,
    onChange: handleRecipientChange,
  };

  return (
    <div className="chat-container">
      <div className="active-users">
        <h2>Active Chats</h2>
        <div className="active-users-list">
          {activeUsers.map((userName, index) => (
            <div 
              key={index} 
              className="active-user" 
              onClick={() => setRecipient(userName)}
            >
              {userName}
            </div>
          ))}
        </div>

        {/* Auto-suggest input for new messages */}
        <Autocomplete
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionFetchRequested}
          onSuggestionsClearRequested={onSuggestionClearRequested}
          getSuggestionValue={suggestion => suggestion.student_name}
          renderSuggestion={suggestion => (
            <div onClick={() => setRecipient(suggestion.student_name)} className="suggestion-item">
              {suggestion.student_name}
            </div>
          )}
          inputProps={inputProps}
        />
      </div>

      <div className="messages-container">
        <h2>Messages with {recipient}</h2>
        <div id="chatBox" className="chat-box">
          {messages.filter(message => 
            // Only include messages that have a receiver
            (message.sender === user.username && message.receiver === recipient) || 
            (message.receiver === user.username && message.sender === recipient)
          ).map((message, index) => (
            <div key={index} className={`message ${message.sender === user.username ? 'sent' : 'received'}`}>
              <strong>{message.sender}:</strong> {message.text}
              <br />
              <small>{new Date(message.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>

        <input
          type="text"
          value={messageInput}
          onChange={handleMessageInputChange}
          placeholder="Enter your message"
          style={{ width: '80%', padding: '8px', marginRight: '10px' }}
        />
        <button onClick={sendMessage} style={{ padding: '8px 16px' }}>Send</button>
      </div>
    </div>
  );
};

export default Chat;