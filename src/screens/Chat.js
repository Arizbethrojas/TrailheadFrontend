import React, { useState, useEffect } from 'react';

const Chat = () => {
  // State for messages and the current input
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState(''); // To show success/error messages

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  // Fetch messages from the server (GET request)
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/get_messages/'); // Ensure this URL is correct
      const data = await response.json();
      if (data.messages) {
        setMessages(data.messages); // Set the messages in the state
      } else {
        setError('Failed to fetch messages');
      }
    } catch (error) {
      setError('Error fetching messages: ' + error.message);
    }
  };

  // Send a new message to the server (POST request)
  const sendMessage = async () => {
    if (!messageInput) return; // Don't send empty messages
  
    const data = {
      message: messageInput,
      sender: 'Anonymous', // Replace with actual sender if necessary
      timestamp: new Date().toISOString(), // Add timestamp here
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/send_message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add CSRF token if needed (see step 4)
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result); // Check the result to verify the response

      if (result.status === 'success') {
        setStatusMessage('Message sent successfully!');
        setMessageInput('');
        fetchMessages(); // Optionally fetch messages again to show the new one
      } else {
        setError(result.message || 'Error sending message');
      }
    } catch (error) {
      setError('Error sending message: ' + error.message);
    }
  };

  // Handle the change in message input
  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <div>
      <h1>Chat</h1>
      <p>Welcome to the Chat Page!</p>

      {/* Display the status message */}
      {statusMessage && <p>{statusMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the messages */}
      <div id="chatBox" style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px', border: '1px solid #ccc', marginBottom: '20px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
            <strong>{message.sender}:</strong> {message.text}
            <br />
            <small>{new Date(message.timestamp).toLocaleString()}</small> {/* Display timestamp */}
          </div>
        ))}
      </div>

      {/* Input for sending a message */}
      <input
        type="text"
        id="messageInput"
        value={messageInput}
        onChange={handleMessageInputChange}
        placeholder="Enter your message"
        style={{ width: '80%', padding: '8px', marginRight: '10px' }}
      />
      <button onClick={sendMessage} style={{ padding: '8px 16px' }}>Send</button>
    </div>
  );
};

export default Chat;