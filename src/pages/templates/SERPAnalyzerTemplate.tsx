import { useState } from "react";
import { ArrowRight, Globe, Code } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileTree from "@/components/FileTree";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
}

const SERPAnalyzerTemplate = () => {
  const [selectedFile, setSelectedFile] = useState<{ name: string; content: string } | null>(null);

  const templateFiles: FileNode[] = [
    {
      name: "manifest.json",
      type: "file",
      content: `{
  "manifest_version": 3,
  "name": "SERP Analyzer",
  "version": "1.0",
  "description": "Analyze search engine results pages (SERPs) for competitive insights",
  "permissions": ["storage", "activeTab", "scripting"],
  "action": {
    "default_popup": "src/pages/popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "background": {
    "service_worker": "src/background/background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["src/content/content.js"]
    }
  ]
}`
    },
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "pages",
          type: "folder",
          children: [
            { 
              name: "popup.html", 
              type: "file",
              content: `<!DOCTYPE html>
<html>
<head>
  <title>SERP Analyzer</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="container">
    <h1>SERP Analyzer</h1>
    <button id="analyze-serp" class="analyze-btn">Analyze Current SERP</button>
    
    <div id="results" class="results hidden">
      <!-- Results will be displayed here -->
    </div>
  </div>
  <script src="popup.js"></script>
</body>
</html>`
            },
            { 
              name: "popup.css", 
              type: "file",
              content: `body {
  width: 500px;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h1 {
  font-size: 1.5rem;
  margin: 0;
  color: #1a73e8;
}

.analyze-btn {
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.7rem 1rem;
  cursor: pointer;
  font-weight: 500;
}

.analyze-btn:hover {
  background-color: #1558b3;
}

.results {
  margin-top: 1rem;
}

.hidden {
  display: none;
}

.serp-feature {
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.feature-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feature-name {
  font-weight: 500;
}

.feature-count {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  background-color: #f0f0f0;
  color: #5f6368;
}

.feature-details {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #5f6368;
}

.competitor-item {
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.competitor-url {
  font-weight: 500;
  margin-bottom: 0.2rem;
}

.competitor-rank {
  font-size: 0.8rem;
  color: #5f6368;
}

.export-btn {
  background-color: #34a853;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.7rem 1rem;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
}

.export-btn:hover {
  background-color: #298a47;
}`
            },
            { 
              name: "popup.js", 
              type: "file",
              content: `document.addEventListener('DOMContentLoaded', function() {
  const analyzeButton = document.getElementById('analyze-serp');
  const resultsDiv = document.getElementById('results');
  
  analyzeButton.addEventListener('click', function() {
    // Send message to content script to analyze the SERP
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (!tabs[0]?.id) return;
      
      chrome.tabs.sendMessage(tabs[0].id, {action: 'analyzeSERP'}, function(response) {
        if (chrome.runtime.lastError) {
          // Handle case where content script might not be loaded
          console.error(chrome.runtime.lastError);
          injectContentScriptAndRetry(tabs[0].id);
          return;
        }
        
        displayResults(response);
      });
    });
  });
  
  function injectContentScriptAndRetry(tabId) {
    // Inject content script if it's not already there
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      files: ['src/content/content.js']
    }, function() {
      // Retry after injection
      chrome.tabs.sendMessage(tabId, {action: 'analyzeSERP'}, function(response) {
        displayResults(response);
      });
    });
  }
  
  function displayResults(serpData) {
    // This would use actual data from the content script
    // For the template, we'll generate mock data
    
    const serpFeatures = [
      {
        name: 'Featured Snippets',
        count: Math.floor(Math.random() * 3),
        details: 'Extracts from top-ranking pages'
      },
      {
        name: 'People Also Ask',
        count: Math.floor(Math.random() * 5),
        details: 'Related questions from users'
      },
      {
        name: 'Image Pack',
        count: Math.floor(Math.random() * 2),
        details: 'Visual results for the query'
      },
      {
        name: 'Video Carousel',
        count: Math.floor(Math.random() * 3),
        details: 'Video results from YouTube and other platforms'
      },
      {
        name: 'Local Pack',
        count: Math.floor(Math.random() * 2),
        details: 'Local business listings'
      }
    ];
    
    const topCompetitors = [];
    for (let i = 0; i < 5; i++) {
      topCompetitors.push({
        url: 'example.com/' + i,
        rank: i + 1
      });
    }
    
    let html = \`
      <h2>SERP Features</h2>
    \`;
    
    serpFeatures.forEach(feature => {
      html += \`
        <div class="serp-feature">
          <div class="feature-header">
            <span class="feature-name">\${feature.name}</span>
            <span class="feature-count">\${feature.count}</span>
          </div>
          <div class="feature-details">\${feature.details}</div>
        </div>
      \`;
    });
    
    html += \`
      <h2>Top Competitors</h2>
    \`;
    
    topCompetitors.forEach(competitor => {
      html += \`
        <div class="competitor-item">
          <div class="competitor-url">\${competitor.url}</div>
          <div class="competitor-rank">Rank: \${competitor.rank}</div>
        </div>
      \`;
    });
    
    html += \`
      <button id="export-results" class="export-btn">Export Results</button>
    \`;
    
    resultsDiv.innerHTML = html;
    resultsDiv.classList.remove('hidden');
    
    // Add export functionality
    document.getElementById('export-results').addEventListener('click', function() {
      alert('In a real extension, this would export the SERP analysis to PDF or CSV');
    });
    
    // Save results to storage
    chrome.storage.local.set({
      lastAnalysis: {
        features: serpFeatures,
        competitors: topCompetitors,
        date: new Date().toISOString()
      }
    });
  }
  
  // Load last analysis if available
  chrome.storage.local.get(['lastAnalysis'], function(result) {
    if (result.lastAnalysis) {
      // Could show a "View previous analysis" button here
    }
  });
});`
            },
          ]
        },
        {
          name: "content",
          type: "folder",
          children: [
            { 
              name: "content.js", 
              type: "file",
              content: `// This script runs on web pages and analyzes the SERP

function analyzeSERP() {
  // Get SERP features
  const featuredSnippets = document.querySelectorAll('.card-section');
  const peopleAlsoAsk = document.querySelectorAll('.related-question-pair');
  const imagePack = document.querySelectorAll('g-img');
  const videoCarousel = document.querySelectorAll('div[jsname="jEmKEd"]');
  const localPack = document.querySelectorAll('div[jsname="HiaYTi"]');
  
  // Get top competitors
  const topCompetitors = document.querySelectorAll('div[data-sokoban-feature="result"]');
  
  return {
    featuredSnippetsCount: featuredSnippets.length,
    peopleAlsoAskCount: peopleAlsoAsk.length,
    imagePackCount: imagePack.length,
    videoCarouselCount: videoCarousel.length,
    localPackCount: localPack.length,
    topCompetitorsCount: topCompetitors.length
  };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'analyzeSERP') {
    const analysisData = analyzeSERP();
    sendResponse(analysisData);
  }
  return true; // Keep the message channel open for async response
});`
            }
          ]
        },
        {
          name: "background",
          type: "folder",
          children: [
            { 
              name: "background.js", 
              type: "file",
              content: `// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('SERP Analyzer extension installed');
});

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle any background tasks here
  return true;
});`
            }
          ]
        },
        {
          name: "utils",
          type: "folder",
          children: [
            { 
              name: "serp-parser.js", 
              type: "file",
              content: `// Helper functions for parsing different SERP features

function parseFeaturedSnippet(element) {
  // Logic to extract data from featured snippet
  return {
    title: element.querySelector('h3')?.textContent,
    url: element.querySelector('a')?.href,
    content: element.querySelector('div[data-attrid="wa"]')?.textContent
  };
}

function parsePeopleAlsoAsk(element) {
  // Logic to extract data from People Also Ask
  return {
    question: element.querySelector('.related-question-pair')?.textContent,
    answer: element.querySelector('.EqjGtd')?.textContent
  };
}

// Add more parsing functions for other SERP features
`
            },
            { 
              name: "data-export.js", 
              type: "file",
              content: `// Functions for exporting SERP data in various formats

function exportToCSV(data) {
  // Logic to convert data to CSV format
  let csvContent = "data:text/csv;charset=utf-8,";
  
  data.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\\r\\n";
  });
  
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "serp_data.csv");
  document.body.appendChild(link); // Required for FF
  
  link.click();
}

function exportToPDF(data) {
  // Logic to convert data to PDF format
  // Requires a PDF library like jsPDF
  console.log('Exporting to PDF is not implemented in this template');
}
`
            }
          ]
        }
      ]
    }
  ];

  const handleUseTemplate = () => {
    toast({
      title: "Template Selected",
      description: "SERP Analyzer template has been loaded!",
    });
  };

  return (
    <div className="container p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">SERP Analyzer Template</h1>
      <p className="text-lg text-muted-foreground mb-6">
        A Chrome extension to analyze search engine results pages (SERPs) for competitive insights.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Analyze Google search results in real-time</li>
            <li>Extract SERP features (featured snippets, PAA boxes, etc.)</li>
            <li>Track competitor rankings and changes</li>
            <li>Identify content opportunities from SERPs</li>
            <li>Export SERP data for analysis</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6">Use Cases</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>SEO specialists tracking keyword rankings</li>
            <li>Content strategists identifying content gaps</li>
            <li>Marketers researching competitive positioning</li>
            <li>Researchers analyzing search patterns</li>
          </ul>
          
          <button 
            className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
            onClick={handleUseTemplate}
          >
            Use This Template
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-secondary p-4 border-b">
            <h3 className="font-medium">Template Files</h3>
          </div>
          <div className="h-[400px] overflow-auto">
            <FileTree 
              onFileSelect={(node) => {
                if (node.type === "file") {
                  setSelectedFile({ name: node.name, content: node.content || "" });
                }
              }}
              selectedFile={selectedFile?.name}
            />
          </div>
        </div>
      </div>
      
      {selectedFile && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-secondary p-4 border-b flex justify-between items-center">
            <h3 className="font-medium">{selectedFile.name}</h3>
          </div>
          <div className="p-4 bg-editor-bg text-editor-text font-mono max-h-[500px] overflow-auto">
            <pre>{selectedFile.content}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SERPAnalyzerTemplate;
