import React, { useState, useEffect } from 'react';
import houseData from '../real_estate_houses.json'; // Assuming the path is correct

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [budget, setBudget] = useState(null);
  const [weatherRiskPreference, setWeatherRiskPreference] = useState(null); // e.g., 'low', 'medium', 'high'

  // Function to toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Initial greeting
      addMessage("Hello! How can I help you find a house today? Please tell me your budget and preferred weather risk level (e.g., 'low', 'medium', 'high').", 'bot');
    }
  };

  // Function to add a message to the chat (memoized with useCallback)
  const addMessage = React.useCallback((text, sender) => {
    // Check if the message being added is identical to the very last message
    // This is a safeguard against potential rapid duplicate additions.
    setMessages(prevMessages => {
        if (prevMessages.length > 0) {
            const lastMsg = prevMessages[prevMessages.length - 1];
            if (lastMsg.text === text && lastMsg.sender === sender) {
                // console.warn("Attempted to add duplicate message:", { text, sender });
                return prevMessages; // Return previous state to prevent adding duplicate
            }
        }
        return [...prevMessages, { text, sender }];
    });
  }, [setMessages]); // setMessages from useState is stable

  // Function to handle user input submission
  const handleSend = () => {
    if (!userInput.trim()) return;

    addMessage(userInput, 'user');
    processUserInput(userInput);
    setUserInput('');
  };

  // Function to process user input and find houses
  const processUserInput = (input) => {
    const budgetMatch = input.match(/budget.*?\$?([\d,]+)/i);
    const riskMatch = input.match(/risk.*? (low|medium|high)/i);

    const parsedBudget = budgetMatch ? parseInt(budgetMatch[1].replace(/,/g, ''), 10) : null;
    const parsedRisk = riskMatch ? riskMatch[1].toLowerCase() : null;

    let currentBudget = budget; // Start with existing state values
    let currentRisk = weatherRiskPreference;
    let confirmationSent = false; // Track if we send a confirmation *this turn*

    // Update state and local 'current' vars if new info is parsed and different
    if (parsedBudget !== null && parsedBudget !== currentBudget) {
      setBudget(parsedBudget);
      currentBudget = parsedBudget; // Update local var for immediate use below
      addMessage(`Okay, budget set to $${currentBudget.toLocaleString()}.`, 'bot');
      confirmationSent = true;
    }
    if (parsedRisk !== null && parsedRisk !== currentRisk) {
      setWeatherRiskPreference(parsedRisk);
      currentRisk = parsedRisk; // Update local var for immediate use below
      addMessage(`Okay, looking for houses with ${currentRisk} weather risk.`, 'bot');
      confirmationSent = true;
    }

    // Decide the next action based on the potentially updated 'current' values
    if (currentBudget !== null && currentRisk !== null) {
      // If both criteria are now met, find houses.
      findMatchingHouses(currentBudget, currentRisk);
    } else if (!confirmationSent) {
      // IMPORTANT: Only ask a question if we didn't *just* send a confirmation.
      // This prevents asking "What's your risk?" right after confirming the budget.
      if (currentBudget === null && currentRisk === null) {
        // Ask for both only if both are missing and no confirmation was just sent
         addMessage("Please tell me your budget and preferred weather risk level (low, medium, or high).", 'bot');
      } else if (currentBudget === null) {
        // Ask for budget if missing and no confirmation was just sent
        addMessage("What is your budget?", 'bot');
      } else { // currentRisk must be null
        // Ask for risk if missing and no confirmation was just sent
        addMessage("What is your preferred weather risk level (low, medium, or high)?", 'bot');
      }
    }
    // If confirmationSent was true, but criteria aren't fully met yet,
    // we deliberately do nothing further in this turn. The bot waits for the next user input.
  };


  // Function to find and display matching houses
  const findMatchingHouses = (currentBudget, currentRisk) => {
    // Ensure houseData is loaded and is an array
    if (!Array.isArray(houseData)) {
        console.error("House data is not loaded or not an array:", houseData);
        addMessage("Sorry, I couldn't load the house data correctly.", 'bot');
        return;
    }

    const matchingHouses = houseData.filter(house => {
      // Add checks to ensure house.price and house.weather_risk exist and are valid
      const price = parseInt(String(house.price).replace(/[^0-9]/g, ''), 10); // Clean price string
      const risk = String(house.weather_risk).toLowerCase();

      if (isNaN(price)) {
          console.warn(`Invalid price for house ID ${house.id}: ${house.price}`);
          return false;
      }
      if (!['low', 'medium', 'high'].includes(risk)) {
          console.warn(`Invalid weather risk for house ID ${house.id}: ${house.weather_risk}`);
          return false;
      }

      return price <= currentBudget && risk === currentRisk;
    });

    if (matchingHouses.length > 0) {
      let response = `Found ${matchingHouses.length} houses matching your criteria:\n`;
      matchingHouses.forEach(house => {
        // Adjust formatting as needed based on your JSON structure
        response += `- ${house.address || `House ID ${house.id}`} ($${parseInt(String(house.price).replace(/[^0-9]/g, ''), 10).toLocaleString()})\n`;
      });
      // Check against last message to prevent duplicates if called multiple times rapidly
      const lastMessageText = messages.length > 0 ? messages[messages.length - 1].text : "";
      if (lastMessageText !== response) {
          addMessage(response, 'bot');
      }
    } else {
      // Check against last message to prevent duplicates
      const lastMessageText = messages.length > 0 ? messages[messages.length - 1].text : "";
      const noResultMessage = "Sorry, I couldn't find any houses matching your criteria.";
      if (lastMessageText !== noResultMessage) {
          addMessage(noResultMessage, 'bot');
      }
    }
  };


  // Effect to scroll chat to the bottom (Keep this one)
  useEffect(() => {
    const chatBox = document.getElementById('chatbot-messages');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {/* Chatbot Popup */}
      {isOpen && (
        <div style={{
          width: '300px',
          height: '400px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <div style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: 'bold', textAlign: 'center' }}>
            House Finder Bot
          </div>

          {/* Messages */}
          <div id="chatbot-messages" style={{ flexGrow: 1, overflowY: 'auto', padding: '10px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: '10px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                <span style={{
                  padding: '8px 12px',
                  borderRadius: '15px',
                  backgroundColor: msg.sender === 'user' ? '#007bff' : '#e9ecef',
                  color: msg.sender === 'user' ? 'white' : 'black',
                  display: 'inline-block',
                  maxWidth: '80%',
                  whiteSpace: 'pre-wrap', // Allows line breaks
                  wordWrap: 'break-word'
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #eee' }}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              style={{ flexGrow: 1, marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              placeholder="Ask about houses..."
            />
            <button onClick={handleSend} style={{ padding: '8px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button onClick={toggleChatbot} style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}>
        {isOpen ? 'X' : '💬'}
      </button>
    </div>
  );
};

export default Chatbot;