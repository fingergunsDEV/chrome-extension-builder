
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

const BacklinkAnalyzerTemplate = () => {
  const [selectedFile, setSelectedFile] = useState<{ name: string; content: string } | null>(null);

  const templateFiles: FileNode[] = [
    {
      name: "manifest.json",
      type: "file",
      content: `{
  "manifest_version": 3,
  "name": "Backlink Analyzer",
  "version": "1.0",
  "description": "Analyze the backlink profile of any webpage for SEO",
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
  <title>Backlink Analyzer</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="container">
    <h1>Backlink Analyzer</h1>
    <div class="url-box">
      <input type="text" id="url" placeholder="Enter a URL to analyze">
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
  width: 450px;
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

.url-box {
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

.summary-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stat-card {
  flex: 1;
  text-align: center;
  background-color: #f8f9fa;
  padding: 0.8rem;
  border-radius: 8px;
  margin: 0 0.3rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a73e8;
}

.stat-label {
  font-size: 0.8rem;
  color: #5f6368;
}

.backlink-item {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
}

.backlink-domain {
  font-weight: 500;
  margin-bottom: 0.2rem;
}

.backlink-url {
  font-size: 0.8rem;
  color: #5f6368;
  word-break: break-all;
}

.backlink-metrics {
  display: flex;
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

.backlink-metric {
  margin-right: 1rem;
  display: flex;
  align-items: center;
}

.metric-icon {
  width: 12px;
  height: 12px;
  margin-right: 4px;
}`
            },
            { 
              name: "popup.js", 
              type: "file",
              content: `document.addEventListener('DOMContentLoaded', function() {
  const analyzeBtn = document.getElementById('analyze');
  const urlInput = document.getElementById('url');
  const resultsDiv = document.getElementById('results');
  
  // Automatically get the current tab's URL
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]?.url) {
      urlInput.value = tabs[0].url;
    }
  });
  
  analyzeBtn.addEventListener('click', function() {
    const url = urlInput.value.trim();
    if (!url) {
      resultsDiv.innerHTML = '<p class="error">Please enter a URL</p>';
      return;
    }
    
    // Show loading state
    resultsDiv.innerHTML = '<p>Analyzing backlinks...</p>';
    
    // This would normally call an API, but we'll simulate it for the template
    setTimeout(() => {
      analyzeBacklinks(url);
    }, 1500);
  });
  
  function analyzeBacklinks(url) {
    // This would normally fetch real data from an API
    // For the template, we'll use mock data
    const mockData = {
      totalBacklinks: Math.floor(Math.random() * 5000) + 200,
      domainsCount: Math.floor(Math.random() * 300) + 50,
      doFollowCount: Math.floor(Math.random() * 2000) + 100,
      noFollowCount: Math.floor(Math.random() * 1000) + 50,
      topBacklinks: [
        {
          domain: 'example.com',
          url: 'https://example.com/blog/topic',
          authority: Math.floor(Math.random() * 100),
          doFollow: Math.random() > 0.3,
          anchor: 'useful resource'
        },
        {
          domain: 'blogspot.com',
          url: 'https://user.blogspot.com/2023/post',
          authority: Math.floor(Math.random() * 100),
          doFollow: Math.random() > 0.3,
          anchor: 'learn more'
        },
        {
          domain: 'wordpress.org',
          url: 'https://wordpress.org/plugins/recommended',
          authority: Math.floor(Math.random() * 100),
          doFollow: Math.random() > 0.3,
          anchor: 'top tools'
        },
        {
          domain: 'medium.com',
          url: 'https://medium.com/@user/article',
          authority: Math.floor(Math.random() * 100),
          doFollow: Math.random() > 0.3,
          anchor: 'click here'
        }
      ]
    };
    
    renderResults(url, mockData);
  }
  
  function renderResults(url, data) {
    // Create domain from URL for display
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    
    let html = \`
      <h2>Backlink Analysis for \${domain}</h2>
      <div class="summary-stats">
        <div class="stat-card">
          <div class="stat-value">\${data.totalBacklinks}</div>
          <div class="stat-label">Total Backlinks</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">\${data.domainsCount}</div>
          <div class="stat-label">Referring Domains</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">\${data.doFollowCount}</div>
          <div class="stat-label">DoFollow Links</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">\${data.noFollowCount}</div>
          <div class="stat-label">NoFollow Links</div>
        </div>
      </div>
      <h3>Top Backlinks</h3>
    \`;
    
    data.topBacklinks.forEach(link => {
      html += \`
        <div class="backlink-item">
          <div class="backlink-domain">\${link.domain}</div>
          <div class="backlink-url">\${link.url}</div>
          <div class="backlink-metrics">
            <div class="backlink-metric">
              <span class="metric-icon">📊</span>
              Authority: \${link.authority}
            </div>
            <div class="backlink-metric">
              <span class="metric-icon">\${link.doFollow ? '✅' : '❌'}</span>
              \${link.doFollow ? 'DoFollow' : 'NoFollow'}
            </div>
            <div class="backlink-metric">
              <span class="metric-icon">🔗</span>
              Anchor: "\${link.anchor}"
            </div>
          </div>
        </div>
      \`;
    });
    
    html += \`
      <button id="export" class="mt-4">Export Report</button>
      <p class="text-sm mt-2">Note: In a real extension, this would connect to a backlink API service</p>
    \`;
    
    resultsDiv.innerHTML = html;
    
    // Add export functionality
    document.getElementById('export').addEventListener('click', function() {
      alert('In a real extension, this would export the data to CSV or PDF');
    });
    
    // Save to storage
    chrome.storage.local.set({ lastUrl: url, lastResults: data });
  }
  
  // Load last analysis if available
  chrome.storage.local.get(['lastUrl', 'lastResults'], function(result) {
    if (result.lastUrl && result.lastResults) {
      urlInput.value = result.lastUrl;
      renderResults(result.lastUrl, result.lastResults);
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
  console.log('Backlink Analyzer extension installed');
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'analyzeBacklinks') {
    const url = message.url;
    
    // In a real extension, you would make API calls to a backlink service here
    // For this template, we'll just send mock data back
    
    // Simulate API delay
    setTimeout(() => {
      sendResponse({
        success: true,
        data: {
          totalBacklinks: Math.floor(Math.random() * 5000) + 200,
          domainsCount: Math.floor(Math.random() * 300) + 50,
          doFollowCount: Math.floor(Math.random() * 2000) + 100,
          noFollowCount: Math.floor(Math.random() * 1000) + 50,
          topBacklinks: [
            // Mock backlinks would be here
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
              content: `// This script runs on web pages
// It could extract link information from the current page

function extractPageLinks() {
  const links = document.querySelectorAll('a');
  const extractedLinks = [];
  
  links.forEach(link => {
    if (link.href && link.href.startsWith('http')) {
      extractedLinks.push({
        url: link.href,
        text: link.textContent.trim(),
        isExternal: link.hostname !== window.location.hostname,
        hasNoFollow: link.rel.includes('nofollow')
      });
    }
  });
  
  return extractedLinks;
}

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'extractLinks') {
    const links = extractPageLinks();
    sendResponse({
      url: window.location.href,
      links: links
    });
  }
  return true;
});`
            }
          ]
        }
      ]
    }
  ];

  const handleUseTemplate = () => {
    toast({
      title: "Template Selected",
      description: "Backlink Analyzer template has been loaded!",
    });
  };

  return (
    <div className="container p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Backlink Analyzer Template</h1>
      <p className="text-lg text-muted-foreground mb-6">
        A Chrome extension to analyze backlink profiles, domain authority, and link quality for better SEO.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Analyze backlink profiles of any webpage</li>
            <li>Track referring domains and link quality</li>
            <li>Identify dofollow vs. nofollow links</li>
            <li>Measure domain authority metrics</li>
            <li>Export backlink reports</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6">Use Cases</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>SEO specialists evaluating link building effectiveness</li>
            <li>Competitive analysis of backlink profiles</li>
            <li>Identifying link building opportunities</li>
            <li>Auditing potentially harmful backlinks</li>
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

export default BacklinkAnalyzerTemplate;
