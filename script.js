document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const processingSection = document.getElementById('processing');
    const resultsSection = document.getElementById('results');
    const terminalText = document.getElementById('terminal-text');
    const progressPercentage = document.getElementById('progress-percentage');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const exportButton = document.getElementById('export-results');
    
    // Engine toggles
    const waybackToggle = document.getElementById('wayback');
    const exaToggle = document.getElementById('exa');
    const firecrawlToggle = document.getElementById('firecrawl');
    
    // Mode selector
    const modeSelect = document.getElementById('mode-select');
    
    // Terminal messages for animation
    const terminalMessages = {
        wayback: [
            "Initializing Wayback Machine agent...",
            "Accessing Internet Archive API...",
            "Searching for historical snapshots...",
            "Analyzing archived pages from 1996-2023...",
            "Extracting temporal data patterns...",
            "Cross-referencing historical versions...",
            "Compiling snapshot timeline..."
        ],
        exa: [
            "Launching EXA.AI neural search agent...",
            "Connecting to semantic knowledge base...",
            "Applying vector embeddings to query...",
            "Performing neural similarity matching...",
            "Analyzing contextual relationships...",
            "Extracting high-relevance information...",
            "Ranking results by semantic proximity..."
        ],
        firecrawl: [
            "Deploying FireCrawl deep web agent...",
            "Accessing distributed crawler network...",
            "Initiating depth-first search protocol...",
            "Parsing non-indexed content sources...",
            "Navigating access-restricted archives...",
            "Extracting data from nested resources...",
            "Compiling deep web findings..."
        ],
        system: [
            "Initializing multi-agent correlation matrix...",
            "Synchronizing result vectors across agents...",
            "Applying temporal-semantic fusion algorithm...",
            "Reducing dimensional complexity...",
            "Generating knowledge synthesis...",
            "Building comprehensive result set...",
            "Finalizing research compilation..."
        ]
    };
    
    // Mock result data - in a real app, this would come from API calls
    const mockResults = {
        wayback: [
            { 
                title: "Original Source Discovered (June 1998)", 
                source: "Wayback Machine Archive", 
                content: "First recorded instance of the queried information found in a defunct geocities site. The content appears to have originated from an academic paper published by researchers at Stanford University."
            },
            { 
                title: "Evolution Tracked (2003-2007)", 
                source: "Wayback Machine Timeline Analysis", 
                content: "The information spread to multiple educational domains during this period, with significant citations appearing in .edu domains. Key adaptations occurred around August 2005."
            },
            { 
                title: "Pre-Social Media Distribution", 
                source: "Wayback Archive", 
                content: "Before widespread social media adoption, the information circulated primarily through forums and early blogs. A significant semantic shift occurred during this transition."
            }
        ],
        exa: [
            { 
                title: "Semantic Similarity Analysis", 
                source: "EXA.AI Neural Search", 
                content: "Our neural network identified 94% semantic match with verified scholarly sources. The core information maintains consistency with academic consensus despite popular variations."
            },
            { 
                title: "Contextual Knowledge Graph", 
                source: "EXA.AI Knowledge Base", 
                content: "The queried information connects to 7 major knowledge domains including computer science, linguistics, and information theory. Strong co-citation patterns with related concepts identified."
            },
            { 
                title: "Authority Assessment", 
                source: "EXA.AI Citation Analysis", 
                content: "Primary authoritative sources traced to research papers from MIT, Stanford, and Berkeley. Commercial applications began appearing circa 2008-2010."
            }
        ],
        firecrawl: [
            { 
                title: "Deep Web Repository Discovery", 
                source: "FireCrawl Report", 
                content: "Located previously unindexed documentation in specialized academic repositories. These sources contain the earliest known formulation of the concept, predating public web mentions by 3 years."
            },
            { 
                title: "Restricted Archive Access", 
                source: "FireCrawl Deep Search", 
                content: "Retrieved information from password-protected archives that contain original research notes. These provide critical context about the development and early applications."
            },
            { 
                title: "Dark Web Mentions Analysis", 
                source: "FireCrawl Secure Index", 
                content: "Identified discussion of the topic in specialized forums not indexed by standard search engines. These communities were early adopters and contributed significant practical applications."
            }
        ]
    };
    
    // Simulate the search process
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (!query) {
            alert("Please enter a search query");
            return;
        }
        
        // Show processing animation
        processingSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        
        // Reset terminal
        terminalText.innerHTML = "";
        
        // Start terminal animation
        simulateTerminalOutput();
        
        // Update progress bar with animation
        updateProgressPercentage();
        
        // After "processing" is complete, show results
        setTimeout(function() {
            processingSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            populateResults();
        }, 15000); // 15 seconds of animation
    });
    
    // Terminal animation
    function simulateTerminalOutput() {
        const allMessages = [];
        
        // Add messages based on selected engines
        if (waybackToggle.checked) {
            allMessages.push(...terminalMessages.wayback.map(msg => ({ text: msg, type: 'wayback' })));
        }
        
        if (exaToggle.checked) {
            allMessages.push(...terminalMessages.exa.map(msg => ({ text: msg, type: 'exa' })));
        }
        
        if (firecrawlToggle.checked) {
            allMessages.push(...terminalMessages.firecrawl.map(msg => ({ text: msg, type: 'firecrawl' })));
        }
        
        // Add system messages at the end
        allMessages.push(...terminalMessages.system.map(msg => ({ text: msg, type: 'system' })));
        
        // Shuffle messages but keep system messages at the end
        const nonSystemMessages = allMessages.filter(msg => msg.type !== 'system');
        const systemMessages = allMessages.filter(msg => msg.type === 'system');
        
        // Simple shuffle algorithm
        for (let i = nonSystemMessages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nonSystemMessages[i], nonSystemMessages[j]] = [nonSystemMessages[j], nonSystemMessages[i]];
        }
        
        const shuffledMessages = [...nonSystemMessages, ...systemMessages];
        
        // Display messages with typing effect
        let i = 0;
        const messageInterval = setInterval(() => {
            if (i < shuffledMessages.length) {
                const msg = shuffledMessages[i];
                addMessageWithTypingEffect(msg.text, msg.type);
                i++;
            } else {
                clearInterval(messageInterval);
            }
        }, 1000);
    }
    
    function addMessageWithTypingEffect(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('terminal-line');
        
        // Add color based on agent type
        if (type === 'wayback') {
            messageElement.style.color = 'var(--wayback-color)';
            messageElement.innerHTML = '[WAYBACK] ';
        } else if (type === 'exa') {
            messageElement.style.color = 'var(--exa-color)';
            messageElement.innerHTML = '[EXA.AI] ';
        } else if (type === 'firecrawl') {
            messageElement.style.color = 'var(--firecrawl-color)';
            messageElement.innerHTML = '[FIRECRAWL] ';
        } else {
            messageElement.style.color = 'var(--primary-color)';
            messageElement.innerHTML = '[SYSTEM] ';
        }
        
        terminalText.appendChild(messageElement);
        
        // Simulate typing effect
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < message.length) {
                messageElement.innerHTML += message.charAt(charIndex);
                charIndex++;
                terminalText.scrollTop = terminalText.scrollHeight;
            } else {
                clearInterval(typeInterval);
            }
        }, 20);
    }
    
    function updateProgressPercentage() {
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 1;
            progressPercentage.textContent = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 150);
    }
    
    // Populate results with mock data
    function populateResults() {
        // Clear previous results
        document.getElementById('wayback-results').innerHTML = '';
        document.getElementById('exa-results').innerHTML = '';
        document.getElementById('firecrawl-results').innerHTML = '';
        document.getElementById('combined-results').innerHTML = '';
        document.getElementById('key-findings').innerHTML = '';
        
        // Add results with delay for animation effect
        if (waybackToggle.checked) {
            mockResults.wayback.forEach((result, index) => {
                setTimeout(() => {
                    addResultItem('wayback-results', result);
                    addResultItem('combined-results', result);
                }, index * 300);
            });
        }
        
        if (exaToggle.checked) {
            mockResults.exa.forEach((result, index) => {
                setTimeout(() => {
                    addResultItem('exa-results', result);
                    addResultItem('combined-results', result);
                }, index * 300);
            });
        }
        
        if (firecrawlToggle.checked) {
            mockResults.firecrawl.forEach((result, index) => {
                setTimeout(() => {
                    addResultItem('firecrawl-results', result);
                    addResultItem('combined-results', result);
                }, index * 300);
            });
        }
        
        // Add summary
        const summaryHTML = `
            <p class="summary-point"><strong>Origin:</strong> First documented in academic papers circa 1995, predating public web presence.</p>
            <p class="summary-point"><strong>Evolution:</strong> Significant semantic shifts occurred around 2005-2007 during transition to social media.</p>
            <p class="summary-point"><strong>Authority:</strong> Primary authoritative sources traced to research from MIT, Stanford, and Berkeley.</p>
            <p class="summary-point"><strong>Distribution:</strong> Spread initially through academic channels before reaching mainstream adoption.</p>
            <p class="summary-point"><strong>Verification:</strong> 94% semantic match with verified scholarly sources confirmed authenticity.</p>
        `;
        
        document.getElementById('key-findings').innerHTML = summaryHTML;
    }
    
    function addResultItem(containerId, result) {
        const container = document.getElementById(containerId);
        const resultElement = document.createElement('div');
        resultElement.classList.add('result-item');
        
        resultElement.innerHTML = `
            <div class="result-title">${result.title}</div>
            <div class="result-source">${result.source}</div>
            <div class="result-content">${result.content}</div>
        `;
        
        container.appendChild(resultElement);
    }
    
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding pane
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Export functionality (mock)
    exportButton.addEventListener('click', function() {
        alert('Results exported to report.pdf');
    });
    
    // Enter key to search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});
