
import React, { useState, useContext } from 'react';
import { FaRobot, FaUser } from 'react-icons/fa6';
import { useFavorites } from '../Contexts/FavoriteContext';
import { GiRaccoonHead } from 'react-icons/gi';
import { ProfileContext } from '../Contexts/ProfileContext';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites } = useFavorites();  // Get favorites from context
  const [userInput, setUserInput] = useState('');
  const [greetingSent, setGreetingSent] = useState(false);
  const [messages, setMessages] = useState([]);
  const { profile } = useContext(ProfileContext);
  
  const addMessage = (text, sender = 'user') => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !greetingSent) {
      // Initial greeting
      addMessage("Hello, I'm Smokey! How can I help you find a house today?", 'bot');
      addMessage("ex. analyze favorites, calculate mortgage payment (house_#), show house details (house_#)", 'bot');
      setGreetingSent(true); 
    }
  };
  const calculateMortgagePayment = (price, downPayment, interestRate, loanTerm) => {
    const principal = price - downPayment;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
  
    // Mortgage formula
    const monthlyPayment = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                           (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  
    return monthlyPayment.toFixed(2); // Return the result as a string with 2 decimal places
  };

  const getMortgageForHouse = (id) => {
    const house = favorites.find(house => house.id === id);
    
    if (!house) {
      return `House with ID ${id} not found in your favorites.`;
    }
  
    const { price, down_payment_required, risks } = house;
    const interestRate = 3.5; // Example fixed rate
    const loanTerm = 30; // Example loan term in years
  
    const mortgagePayment = calculateMortgagePayment(price, down_payment_required, interestRate, loanTerm);
  
    const annualMortgageCost = parseFloat(mortgagePayment) * 12;
    const annualIncome = parseFloat(profile.income);
    let percentMessage = '';
    if (annualIncome && annualIncome > 0) {
      const percentOfIncome = (annualMortgageCost / annualIncome) * 100;
      if(percentOfIncome < 30)
        percentMessage = `, which is approximately ${percentOfIncome.toFixed(2)}% of your annual income. This is a good percent, and is a financially safe decision`;
      else
      percentMessage = `, which is approximately ${percentOfIncome.toFixed(2)}% of your annual income. This is a little high, and probably is not a financially safe decision. Try finding a payment lower than 30% of your income`;
    }
  
    return `The monthly mortgage payment for ${house.street_address} in ${house.city} is approximately $${mortgagePayment}${percentMessage}. `;
  };


  const getRiskForHouse = (id) => {
    const house = favorites.find(house => house.id === id);
    
    if (!house) {
      return `House with ID ${id} not found in your favorites.`;
    }
  
    const { risks } = house;
    const riskMessages = Object.entries(risks)
      .map(([risk, level]) => `${risk.replace('_', ' ')}: ${level}`)
      .join('\n');
  
    return `Here are the risk levels for ${house.street_address} in ${house.city}:\n\n${riskMessages}`;
  };

  const getHouseDetails = (id) => {
    const house = favorites.find(house => house.id === id);
    
    if (!house) {
      return `House with ID ${id} not found in your favorites.`;
    }
  
    const { price, down_payment_required, city, street_address, bathroom_count, bedroom_count, sq_ft, img } = house;
  
    const baseDetails = `
    Here are the details for ${street_address} in ${city}:
    
    - Price: $${price.toLocaleString()}
    - Down Payment: $${down_payment_required.toLocaleString()}
    - Bathrooms: ${bathroom_count}
    - Bedrooms: ${bedroom_count}
    - Square Feet: ${sq_ft}
  `;
    const mortgageInfo = getMortgageForHouse(id);

    return `${baseDetails}\n\nMortgage Info:\n${mortgageInfo}`;
  };
  
  const processUserInput = (favorites) => {
    // Ensure favorites is an array
    if (!Array.isArray(favorites)) {
      console.error('Favorites is not an array:', favorites);
      favorites = [];
    }

    let financialRisks = {
      foundationalIssues: 0,
      insuranceNeeded: 0,
      warningMessages: [],
    };

    favorites.forEach((house) => {
      const risks =  house.risks;

      // Check for foundational issues (high drought + high flood)
      if (risks.drought_risk === 'High' && risks.coastal_flooding_risk === 'High') {
        financialRisks.foundationalIssues += 1;
        financialRisks.warningMessages.push(`${house.street_address} in ${house.city} has both high drought and high flood risks. This could lead to foundational issues.`);
      }

      // Check if tsunami insurance is needed (high tsunami risk)
      if (risks.itsunami_risk === 'High') {
        financialRisks.insuranceNeeded += 1;
        financialRisks.warningMessages.push(`${house.street_address} in ${house.city} is in a tsunami-prone area. Tsunami insurance is recommended.`);
      }

      if (risks.tornado_risk === 'High') {
        financialRisks.insuranceNeeded += 1;
        financialRisks.warningMessages.push(`${house.street_address} in ${house.city} is in a high tornado risk area. Consider tornado insurance.`);
      }
  
      if (risks.wildfire_risk === 'High') {
        financialRisks.insuranceNeeded += 1;
        financialRisks.warningMessages.push(`${house.street_address} in ${house.city} is in a high wildfire risk area. Consider wildfire insurance.`);
      }
    });



    // Return a summary of the analysis
    if (financialRisks.warningMessages.length > 0) {
      return {
        message: `Warning: The following risks have been identified in your favorite houses:\n\n${financialRisks.warningMessages.join('\n')}`,
        foundationalIssues: financialRisks.foundationalIssues,
        insuranceNeeded: financialRisks.insuranceNeeded,
      };
    } else {
      return {
        message: 'All of your favorite houses have manageable weather risks. These would be smart investments.',
        foundationalIssues: financialRisks.foundationalIssues,
        insuranceNeeded: financialRisks.insuranceNeeded,
      };
    }
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    addMessage(userInput, 'user');
    
    if (userInput.toLowerCase().includes('analyze favorites')) {
      // Analyze favorites if the user asks for it
        const analysis = processUserInput(favorites);
        addMessage(analysis.message, 'bot');
      }
    else if (userInput.toLowerCase().includes('mortgage payment')) {
      const houseId = extractHouseId(userInput); // Extract ID from user input (e.g., "mortgage payment for house_2")
      const response = getMortgageForHouse(houseId);
      addMessage(response, 'bot');
    } else if (userInput.toLowerCase().includes('risk level')) {
      const houseId = extractHouseId(userInput); // Extract ID from user input (e.g., "risk level for house_2")
      const response = getRiskForHouse(houseId);
      addMessage(response, 'bot');
    } else if (userInput.toLowerCase().includes('details')) {
      const houseId = extractHouseId(userInput); // Extract ID from user input (e.g., "details for house_2")
      const response = getHouseDetails(houseId);
      addMessage(response, 'bot');
    } else {
      addMessage("I'm still learning! Try asking about mortgage payment, risk level, or house details.", 'bot');
    }
  
    setUserInput('');
  };

  const extractHouseId = (input) => {
    const match = input.match(/house_\d+/); // Simple regex to match house IDs (e.g., house_2)
    return match ? match[0] : null;
  };

  const logFavorites = (favorites) => {
    if (!Array.isArray(favorites) || favorites.length === 0) {
      console.log('No favorite houses available.');
      return;
    } 
    favorites.forEach((house, index) => {
      console.log(`House ${index + 1}:`);
      console.log(`  ID: ${house.id}`);
      console.log(`  Address: ${house.street_address}, ${house.city}, ${house.state} ${house.zip_code}`);
      console.log(`  Price: $${house.price.toLocaleString()}`);
      console.log(`  Bedroom Count: ${house.bedroom_count}`);
      console.log(`  Bathroom Count: ${house.bathroom_count}`);
      console.log(`  Square Footage: ${house.sq_ft}`);
      console.log(`  Risks: `);
      Object.entries(house.risks).forEach(([riskType, riskLevel]) => {
        console.log(`    ${riskType}: ${riskLevel}`);
      });
      console.log('-------------------------------------');
    });
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {isOpen && (
        <div style={{
          width: '400px',
          height: '400px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}>
          <div style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: 'bold', textAlign: 'center' }}>
            House Finder
          </div>

          <div id="chatbot-messages" style={{ flexGrow: 1, overflowY: 'auto', padding: '10px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: '10px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                <span style={{
                  padding: '8px 12px',
                  borderRadius: '15px',
                  backgroundColor: msg.sender === 'user' ? '#4F3527' : '#e9ecef',
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
             
          <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #eee' }}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              style={{ flexGrow: 1, marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              placeholder="Ask about houses..."
            />
            <button
              onClick={handleSend}
              style={{ padding: '8px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#4F3527', color: 'white', cursor: 'pointer' }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={toggleChatbot}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#4F3527',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        }}
      >
        {isOpen ? 'X' : <GiRaccoonHead className="w-[100%] h-[100%]" />}
      </button>
    </div>
  );
};

export default Chatbot;