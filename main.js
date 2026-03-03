document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initSearchBar();
  initCategoryButtons();
  initChatbot();
  initAuthTabs();
  initLanguageSelector();
  initButtons();
  
  // Search Bar Functionality
  function initSearchBar() {
    const searchBar = document.querySelector('.search-bar');
    const micIcon = document.querySelector('.mic-icon');
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchBar) {
      // Search functionality on Enter key
      searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          performSearch(searchBar.value);
        }
      });
      
      // Search functionality on search icon click
      if (searchIcon) {
        searchIcon.addEventListener('click', function() {
          performSearch(searchBar.value);
        });
      }
      
      // Voice search functionality
      if (micIcon) {
        micIcon.addEventListener('click', function() {
          // Add visual feedback
          this.classList.add('active');
          
          // Show a message to indicate voice search is active
          const searchContainer = document.querySelector('.search-container');
          const voiceMsg = document.createElement('div');
          voiceMsg.classList.add('voice-search-active');
          voiceMsg.textContent = 'Listening... Speak now';
          voiceMsg.style.position = 'absolute';
          voiceMsg.style.bottom = '-30px';
          voiceMsg.style.left = '0';
          voiceMsg.style.right = '0';
          voiceMsg.style.textAlign = 'center';
          voiceMsg.style.color = 'var(--accent-teal)';
          searchContainer.appendChild(voiceMsg);
          
          // Simulate voice recognition (in a real app, this would use the Web Speech API)
          setTimeout(() => {
            // Remove active state and message
            micIcon.classList.remove('active');
            voiceMsg.remove();
            
            // Simulate recognized text
            const demoQueries = [
              "Food assistance near me",
              "Medical help in Bangalore",
              "Education scholarships for students",
              "Shelter for homeless"
            ];
            const randomQuery = demoQueries[Math.floor(Math.random() * demoQueries.length)];
            searchBar.value = randomQuery;
            
            // Perform search with the simulated voice input
            performSearch(randomQuery);
          }, 2000);
        });
      }
    }
    
    // Function to perform search
    function performSearch(query) {
      query = query.trim();
      if (query !== '') {
        // Show search results (in a real app, this would fetch results from a server)
        alert(`Searching for: "${query}"\n\nIn a complete implementation, this would show relevant help resources, NGOs, and assistance programs related to your query.`);
        
        // For demo purposes, activate a relevant category button if the search matches
        const categoryButtons = document.querySelectorAll('.category-btn');
        const queryLower = query.toLowerCase();
        
        categoryButtons.forEach(button => {
          const category = button.getAttribute('data-category').toLowerCase();
          if (queryLower.includes(category)) {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to matching button
            button.classList.add('active');
          }
        });
      }
    }
  }
  
  // Category Buttons
  function initCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get category name
        const category = this.getAttribute('data-category');
        
        // Show a message about the selected category
        alert(`Category selected: ${category}\n\nIn a complete implementation, this would filter resources and assistance programs related to ${category}.`);
      });
    });
  }
  
  // Initialize all buttons with click feedback
  function initButtons() {
    const allButtons = document.querySelectorAll('button, .btn');
    
    allButtons.forEach(button => {
      if (!button.classList.contains('initialized')) {
        button.classList.add('initialized');
        
        button.addEventListener('click', function(e) {
          // Don't apply to buttons that already have specific handlers
          if (this.classList.contains('category-btn') || 
              this.classList.contains('chat-send-btn') || 
              this.classList.contains('mobile-menu-toggle') ||
              this.classList.contains('vote-btn')) {
            return;
          }
          
          // Add visual feedback
          const ripple = document.createElement('span');
          ripple.classList.add('ripple-effect');
          
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          
          ripple.style.width = ripple.style.height = `${size}px`;
          ripple.style.left = `${e.clientX - rect.left - size/2}px`;
          ripple.style.top = `${e.clientY - rect.top - size/2}px`;
          
          this.appendChild(ripple);
          
          // Show a message for demo purposes
          if (this.textContent.trim() !== '') {
            setTimeout(() => {
              alert(`Button clicked: ${this.textContent.trim()}\n\nIn a complete implementation, this would perform the associated action.`);
            }, 300);
          }
          
          // Remove the ripple after animation
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      }
    });
  }
  
  // Chatbot Functionality
  function initChatbot() {
    const chatInput = document.querySelector('.chat-input');
    const chatMessages = document.querySelector('.chat-messages');
    const sendButton = document.querySelector('.chat-send-btn');
    
    if (chatInput && chatMessages && sendButton) {
      // Function to add a message to the chat
      function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.classList.add(isUser ? 'message-user' : 'message-bot');
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message;
        
        messageElement.appendChild(messageContent);
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
      
      // Function to process user input and get AI response
      function processMessage(userMessage) {
        // Add user message to chat
        addMessage(userMessage, true);
        
        // In a real app, this would call an API to get the AI response
        // For now, we'll simulate a response
        setTimeout(() => {
          let botResponse;
          
          // Simple pattern matching for demo purposes
          const messageLower = userMessage.toLowerCase();
          
          if (messageLower.includes('food') || messageLower.includes('hungry')) {
            botResponse = "I can help you find food assistance. There are several food banks and community kitchens in your area. The nearest one is 'Community Food Center' about 2 km from your location. They serve meals daily from 11 AM to 2 PM. Would you like me to show you directions?";
          } else if (messageLower.includes('medical') || messageLower.includes('doctor') || messageLower.includes('health')) {
            botResponse = "For medical assistance, I recommend 'City Health Clinic' which offers free basic healthcare services. They're open Monday-Saturday, 9 AM to 5 PM. For emergencies, please call the helpline at 108. Would you like me to connect you with a healthcare advisor?";
          } else if (messageLower.includes('education') || messageLower.includes('school') || messageLower.includes('study')) {
            botResponse = "There are several educational support programs available. 'Learning For All' offers free tutoring and educational materials. They also have scholarship opportunities for students in need. Would you like me to provide their contact information?";
          } else if (messageLower.includes('shelter') || messageLower.includes('home') || messageLower.includes('housing')) {
            botResponse = "For temporary shelter, 'Safe Haven' provides emergency housing services. They currently have 12 beds available. For long-term housing assistance, you can apply through the 'Housing Support Program'. Would you like me to help you start an application?";
          } else {
            botResponse = "I understand you need help with that. Let me connect you with the right resources. Could you provide a bit more detail about what specific assistance you're looking for?";
          }
          
          addMessage(botResponse);
        }, 1000);
      }
      
      // Send message on button click
      sendButton.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message !== '') {
          processMessage(message);
          chatInput.value = '';
        }
      });
      
      // Send message on Enter key
      chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          const message = chatInput.value.trim();
          if (message !== '') {
            processMessage(message);
            chatInput.value = '';
          }
        }
      });
      
      // Add initial bot message
      addMessage("Hello! I'm Aadhara's AI assistant. How can I help you today? You can ask me about food assistance, healthcare, education support, or shelter services.");
    }
  }
  
  // Auth Tabs
  function initAuthTabs() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    if (authTabs.length && authForms.length) {
      authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          const target = this.getAttribute('data-target');
          
          // Hide all forms
          authForms.forEach(form => {
            form.style.display = 'none';
          });
          
          // Show target form
          document.getElementById(target).style.display = 'block';
          
          // Update active tab
          authTabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
        });
      });
      
      // Add form submission handlers
      const loginForm = document.getElementById('login-form');
      const signupForm = document.getElementById('signup-form');
      
      if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Login functionality would be implemented in the full version. This would authenticate the user and redirect to the appropriate dashboard.');
        });
      }
      
      if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Signup functionality would be implemented in the full version. This would create a new user account and set up their profile based on the selected user type.');
        });
      }
      
      // Add handlers for social login buttons
      const socialButtons = document.querySelectorAll('.social-button');
      socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          alert('Social login would be implemented in the full version. This would authenticate the user through the selected social platform.');
        });
      });
    }
  }
  
  // Language Selector
  function initLanguageSelector() {
    const languageSelector = document.querySelector('.language-selector select');
    
    if (languageSelector) {
      languageSelector.addEventListener('change', function() {
        const selectedLanguage = this.value;
        const languageNames = {
          'en': 'English',
          'hi': 'Hindi',
          'kn': 'Kannada',
          'ta': 'Tamil',
          'bn': 'Bengali',
          'te': 'Telugu',
          'mr': 'Marathi'
        };
        
        // Show a message about the language change
        alert(`Language changed to: ${languageNames[selectedLanguage]}\n\nIn a complete implementation, this would translate the entire interface to ${languageNames[selectedLanguage]}.`);
        
        // You could implement language switching like this:
        // document.documentElement.lang = selectedLanguage;
        // loadTranslations(selectedLanguage);
      });
    }
  }
  
  // Voting System
  const voteButtons = document.querySelectorAll('.vote-btn');
  if (voteButtons.length) {
    voteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const voteType = this.getAttribute('data-vote');
        const solutionId = this.closest('.solution-card').getAttribute('data-id');
        
        // In a real app, this would send the vote to the server
        // For now, we'll just update the UI
        const voteCount = this.querySelector('.vote-count');
        let count = parseInt(voteCount.textContent);
        
        if (this.classList.contains('voted')) {
          // Undo vote
          count--;
          this.classList.remove('voted');
        } else {
          // Add vote
          count++;
          this.classList.add('voted');
          
          // Remove vote from opposite button if it exists
          const oppositeType = voteType === 'up' ? 'down' : 'up';
          const oppositeButton = this.closest('.vote-buttons').querySelector(`[data-vote="${oppositeType}"]`);
          
          if (oppositeButton && oppositeButton.classList.contains('voted')) {
            const oppositeCount = oppositeButton.querySelector('.vote-count');
            oppositeCount.textContent = parseInt(oppositeCount.textContent) - 1;
            oppositeButton.classList.remove('voted');
          }
        }
        
        voteCount.textContent = count;
        
        // Show a message about the vote
        const voteAction = this.classList.contains('voted') ? 'added' : 'removed';
        const voteTypeText = voteType === 'up' ? 'upvote' : 'downvote';
        alert(`Vote ${voteAction}: ${voteTypeText} for solution ${solutionId}\n\nIn a complete implementation, this would update the solution's rating in the database and help improve recommendations.`);
      });
    });
  }
  
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      
      // Change icon based on menu state
      const icon = this.querySelector('i');
      if (navLinks.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Add CSS for button ripple effect
  const style = document.createElement('style');
  style.textContent = `
    .ripple-effect {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    button, .btn {
      position: relative;
      overflow: hidden;
    }
    
    .mic-icon.active {
      animation: pulse 1s infinite;
    }
    
    @keyframes pulse {
      0% {
        transform: translateY(-50%) scale(1);
      }
      50% {
        transform: translateY(-50%) scale(1.2);
        color: var(--accent-orange);
      }
      100% {
        transform: translateY(-50%) scale(1);
      }
    }
    
    .nav-links.show {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      background-color: var(--primary-dark);
      padding: var(--spacing-md);
      box-shadow: var(--shadow-md);
      z-index: var(--z-dropdown);
    }
  `;
  document.head.appendChild(style);
});