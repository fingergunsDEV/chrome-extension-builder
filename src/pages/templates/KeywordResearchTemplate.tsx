
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileTree from "@/components/FileTree";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
}

const KeywordResearchTemplate = () => {
  const [selectedFile, setSelectedFile] = useState<{ name: string; content: string } | null>(null);

  const templateFiles: FileNode[] = [
    {
      name: "manifest.json",
      type: "file",
      content: `{
  "manifest_version": 3,
  "name": "Keyword Research Tool",
  "version": "1.0",
  "description": "Analyze keyword metrics and find keyword opportunities",
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
      "matches": ["*://*.google.com/search*"],
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
  <title>Keyword Research Tool</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="container">
    <h1>Keyword Research Tool</h1>
    <div class="search-box">
      <input type="text" id="keyword" placeholder="Enter a keyword">
      <button id="analyze">Analyze</button>
    </div>
    <div id="results" class="results">
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
  width: 400px;
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

.search-box {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #1558b3;
}

.results {
  margin-top: 1rem;
}

.keyword-card {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 0.5rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
  border-bottom: 1px solid #f5f5f5;
}

.metric-name {
  font-weight: 500;
}

.related-keywords {
  margin-top: 1rem;
}

.related-keyword {
  background-color: #f1f3f4;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}`
            },
            { 
              name: "popup.js", 
              type: "file",
              content: `document.addEventListener('DOMContentLoaded', function() {
  const analyzeBtn = document.getElementById('analyze');
  const keywordInput = document.getElementById('keyword');
  const resultsDiv = document.getElementById('results');
  
  analyzeBtn.addEventListener('click', function() {
    const keyword = keywordInput.value.trim();
    if (!keyword) {
      resultsDiv.innerHTML = '<p class="error">Please enter a keyword</p>';
      return;
    }
    
    // Show loading state
    resultsDiv.innerHTML = '<p>Analyzing keyword data...</p>';
    
    // This would normally call an API, but we'll simulate it for the template
    setTimeout(() => {
      analyzeKeyword(keyword);
    }, 1500);
  });
  
  function analyzeKeyword(keyword) {
    // This would normally fetch real data from an API
    // For the template, we'll use mock data
    const mockData = {
      searchVolume: Math.floor(Math.random() * 10000) + 500,
      difficulty: Math.floor(Math.random() * 100),
      cpc: (Math.random() * 5).toFixed(2),
      competition: (Math.random() * 0.9).toFixed(2),
      relatedKeywords: [
        keyword + ' tool',
        keyword + ' software',
        'best ' + keyword,
        keyword + ' tips',
        'how to ' + keyword
      ]
    };
    
    renderResults(keyword, mockData);
  }
  
  function renderResults(keyword, data) {
    let html = \`
      <div class="keyword-card">
        <h2>\${keyword}</h2>
        <div class="metrics">
          <div class="metric">
            <span class="metric-name">Search Volume</span>
            <span class="metric-value">\${data.searchVolume}</span>
          </div>
          <div class="metric">
            <span class="metric-name">Keyword Difficulty</span>
            <span class="metric-value">\${data.difficulty}%</span>
          </div>
          <div class="metric">
            <span class="metric-name">CPC</span>
            <span class="metric-value">$\${data.cpc}</span>
          </div>
          <div class="metric">
            <span class="metric-name">Competition</span>
            <span class="metric-value">\${data.competition}</span>
          </div>
        </div>
        <div class="related-keywords">
          <h3>Related Keywords</h3>
          <div>
    \`;
    
    data.relatedKeywords.forEach(kw => {
      html += \`<span class="related-keyword">\${kw}</span>\`;
    });
    
    html += \`
          </div>
        </div>
      </div>
    \`;
    
    resultsDiv.innerHTML = html;
    
    // Save to storage
    chrome.storage.local.set({ lastKeyword: keyword, lastResults: data });
  }
  
  // Load last search if available
  chrome.storage.local.get(['lastKeyword', 'lastResults'], function(result) {
    if (result.lastKeyword && result.lastResults) {
      keywordInput.value = result.lastKeyword;
      renderResults(result.lastKeyword, result.lastResults);
    }
  });
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
  console.log('Keyword Research Tool extension installed');
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getKeywordData') {
    const keyword = message.keyword;
    
    // In a real extension, you would make API calls here
    // For this template, we'll just send mock data back
    
    // Simulate API delay
    setTimeout(() => {
      sendResponse({
        success: true,
        data: {
          searchVolume: Math.floor(Math.random() * 10000) + 500,
          difficulty: Math.floor(Math.random() * 100),
          cpc: (Math.random() * 5).toFixed(2),
          competition: (Math.random() * 0.9).toFixed(2),
          relatedKeywords: [
            keyword + ' tool',
            keyword + ' software',
            'best ' + keyword,
            keyword + ' tips',
            'how to ' + keyword
          ]
        }
      });
    }, 1000);
    
    // Important: return true to indicate you'll respond asynchronously
    return true;
  }
});`
            }
          ]
        },
        {
          name: "content",
          type: "folder",
          children: [
            { 
              name: "content.js", 
              type: "file",
              content: `// This script runs on Google search result pages
// It extracts keywords and search data

function extractSearchData() {
  // Get the main search query
  const searchInput = document.querySelector('input[name="q"]');
  const mainKeyword = searchInput ? searchInput.value : '';
  
  // Get related searches
  const relatedSearches = [];
  const relatedLinks = document.querySelectorAll('.related-question-pair');
  relatedLinks.forEach(link => {
    relatedSearches.push(link.textContent.trim());
  });
  
  // Get search result URLs
  const searchResults = [];
  const resultLinks = document.querySelectorAll('#search a:not([class])');
  resultLinks.forEach(link => {
    if (link.href && !link.href.includes('google.com')) {
      searchResults.push({
        title: link.textContent.trim(),
        url: link.href
      });
    }
  });
  
  return {
    mainKeyword,
    relatedSearches,
    searchResults
  };
}

// Send data to the extension when the page is loaded
window.addEventListener('load', () => {
  const searchData = extractSearchData();
  chrome.runtime.sendMessage({
    type: 'searchData',
    data: searchData
  });
});

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'extractSearchData') {
    const searchData = extractSearchData();
    sendResponse(searchData);
  }
  return true;
});`
            }
          ]
        }
      ]
    },
    {
      name: "icons",
      type: "folder",
      children: [
        { 
          name: "icon16.png", 
          type: "file",
          content: "[Binary content - icon image]"
        },
        { 
          name: "icon48.png", 
          type: "file",
          content: "[Binary content - icon image]"
        },
        { 
          name: "icon128.png", 
          type: "file",
          content: "[Binary content - icon image]"
        }
      ]
    }
  ];

  const handleUseTemplate = () => {
    toast({
      title: "Template Selected",
      description: "Keyword Research Tool template has been loaded!",
    });
  };

  return (
    <div className="container p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Keyword Research Tool Template</h1>
      <p className="text-lg text-muted-foreground mb-6">
        A Chrome extension to analyze keywords, search volume, and related metrics to improve SEO.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Analyze keyword metrics (search volume, difficulty, CPC)</li>
            <li>Find related keywords and search suggestions</li>
            <li>Save keyword research history</li>
            <li>Extract keywords from Google search results</li>
            <li>Compare keyword metrics side-by-side</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6">Use Cases</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Content creators researching topics</li>
            <li>SEO specialists analyzing ranking potential</li>
            <li>Marketers identifying low-competition keywords</li>
            <li>Bloggers planning content strategy</li>
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

export default KeywordResearchTemplate;
