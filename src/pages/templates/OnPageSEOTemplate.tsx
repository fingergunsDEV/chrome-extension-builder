
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

const OnPageSEOTemplate = () => {
  const [selectedFile, setSelectedFile] = useState<{ name: string; content: string } | null>(null);

  const templateFiles: FileNode[] = [
    {
      name: "manifest.json",
      type: "file",
      content: `{
  "manifest_version": 3,
  "name": "On-Page SEO Checker",
  "version": "1.0",
  "description": "Analyze and optimize on-page SEO factors",
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
  <title>On-Page SEO Checker</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="container">
    <h1>On-Page SEO Checker</h1>
    <button id="analyze-page" class="analyze-btn">Analyze This Page</button>
    
    <div class="progress-container hidden" id="progress-container">
      <div class="progress-bar">
        <div class="progress" id="progress"></div>
      </div>
      <div class="progress-text" id="progress-text">Analyzing page...</div>
    </div>
    
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

.progress-container {
  margin: 1rem 0;
}

.progress-bar {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #1a73e8;
  width: 0%;
  transition: width 0.3s;
}

.progress-text {
  font-size: 0.8rem;
  color: #5f6368;
  margin-top: 0.5rem;
  text-align: center;
}

.results {
  margin-top: 1rem;
}

.hidden {
  display: none;
}

.seo-score {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.score-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.score-excellent {
  background-color: #34a853;
}

.score-good {
  background-color: #fbbc05;
}

.score-needs-improvement {
  background-color: #ea4335;
}

.score-text {
  flex: 1;
}

.score-text h3 {
  margin: 0;
  font-size: 1.2rem;
}

.score-text p {
  margin: 0.2rem 0 0;
  font-size: 0.9rem;
  color: #5f6368;
}

.seo-factors {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.factor {
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.factor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.factor-name {
  font-weight: 500;
}

.factor-status {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}

.status-good {
  background-color: #e6f4ea;
  color: #34a853;
}

.status-warning {
  background-color: #fef7e0;
  color: #fbbc05;
}

.status-error {
  background-color: #fce8e6;
  color: #ea4335;
}

.factor-details {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #5f6368;
}

.factor-suggestion {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
}`
            },
            { 
              name: "popup.js", 
              type: "file",
              content: `document.addEventListener('DOMContentLoaded', function() {
  const analyzeButton = document.getElementById('analyze-page');
  const progressContainer = document.getElementById('progress-container');
  const progressBar = document.getElementById('progress');
  const progressText = document.getElementById('progress-text');
  const resultsDiv = document.getElementById('results');
  
  analyzeButton.addEventListener('click', function() {
    // Hide results and show progress
    resultsDiv.classList.add('hidden');
    progressContainer.classList.remove('hidden');
    progressBar.style.width = '0%';
    
    // Send message to content script to analyze the page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (!tabs[0]?.id) return;
      
      chrome.tabs.sendMessage(tabs[0].id, {action: 'analyzePage'}, function(response) {
        if (chrome.runtime.lastError) {
          // Handle case where content script might not be loaded
          console.error(chrome.runtime.lastError);
          injectContentScriptAndRetry(tabs[0].id);
          return;
        }
        
        simulateAnalysisProgress(response);
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
      chrome.tabs.sendMessage(tabId, {action: 'analyzePage'}, function(response) {
        simulateAnalysisProgress(response);
      });
    });
  }
  
  function simulateAnalysisProgress(pageData) {
    const steps = ['Analyzing meta tags', 'Checking headings', 'Analyzing content', 'Evaluating images', 'Checking links', 'Calculating score'];
    let currentStep = 0;
    let progressValue = 0;
    
    // Simulate a progress bar
    const interval = setInterval(() => {
      progressValue += 5;
      progressBar.style.width = progressValue + '%';
      
      if (progressValue % 20 === 0 && currentStep < steps.length) {
        progressText.textContent = steps[currentStep];
        currentStep++;
      }
      
      if (progressValue >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          progressContainer.classList.add('hidden');
          displayResults(pageData);
        }, 500);
      }
    }, 100);
  }
  
  function displayResults(pageData) {
    // This would use actual data from the content script
    // For the template, we'll generate mock data
    
    const seoFactors = [
      {
        name: 'Title Tag',
        status: pageData?.title?.length > 10 && pageData?.title?.length < 60 ? 'good' : 'warning',
        details: \`Length: \${pageData?.title?.length || 0} characters\`,
        suggestion: pageData?.title?.length < 10 ? 'Title tag is too short. Aim for 50-60 characters.' : 
                  pageData?.title?.length > 60 ? 'Title tag is too long. Keep it under 60 characters.' :
                  'Good title length!'
      },
      {
        name: 'Meta Description',
        status: pageData?.description ? (
                pageData.description.length > 120 && pageData.description.length < 155 ? 'good' : 'warning'
               ) : 'error',
        details: pageData?.description ? \`Length: \${pageData.description.length} characters\` : 'Missing meta description',
        suggestion: !pageData?.description ? 'Add a meta description to improve click-through rates.' :
                  pageData.description.length < 120 ? 'Meta description is too short. Aim for 120-155 characters.' :
                  pageData.description.length > 155 ? 'Meta description is too long. Keep it under 155 characters.' :
                  'Good meta description length!'
      },
      {
        name: 'Heading Structure',
        status: pageData?.h1Count === 1 ? 'good' : 'warning',
        details: \`H1: \${pageData?.h1Count || 0}, H2: \${pageData?.h2Count || 0}, H3: \${pageData?.h3Count || 0}\`,
        suggestion: pageData?.h1Count === 0 ? 'Missing H1 tag. Add one to improve SEO.' :
                  pageData?.h1Count > 1 ? 'Multiple H1 tags detected. Use only one H1 per page.' :
                  'Good heading structure!'
      },
      {
        name: 'Image Optimization',
        status: pageData?.imagesWithAlt / pageData?.totalImages > 0.8 ? 'good' : 'warning',
        details: \`\${pageData?.imagesWithAlt || 0} out of \${pageData?.totalImages || 0} images have alt text\`,
        suggestion: pageData?.imagesWithAlt / pageData?.totalImages < 0.8 ? 'Add alt text to all images for better accessibility and SEO.' :
                  'Good image optimization!'
      },
      {
        name: 'Content Length',
        status: pageData?.wordCount > 300 ? 'good' : 'warning',
        details: \`\${pageData?.wordCount || 0} words\`,
        suggestion: pageData?.wordCount < 300 ? 'Content is too short. Aim for at least 300 words for better SEO.' :
                  'Good content length!'
      },
      {
        name: 'URL Structure',
        status: /[A-Z]|\\s|[^a-zA-Z0-9\\-\\/]/.test(pageData?.url || '') ? 'warning' : 'good',
        details: pageData?.url || '',
        suggestion: /[A-Z]|\\s|[^a-zA-Z0-9\\-\\/]/.test(pageData?.url || '') ? 'URL contains uppercase letters, spaces, or special characters. Use lowercase with hyphens.' :
                  'Good URL structure!'
      }
    ];
    
    // Calculate overall score based on factor status
    const goodFactors = seoFactors.filter(f => f.status === 'good').length;
    const score = Math.round((goodFactors / seoFactors.length) * 100);
    
    let scoreClass, scoreText;
    if (score >= 80) {
      scoreClass = 'score-excellent';
      scoreText = 'Excellent';
    } else if (score >= 60) {
      scoreClass = 'score-good';
      scoreText = 'Good';
    } else {
      scoreClass = 'score-needs-improvement';
      scoreText = 'Needs Improvement';
    }
    
    let html = \`
      <div class="seo-score">
        <div class="score-circle \${scoreClass}">\${score}</div>
        <div class="score-text">
          <h3>\${scoreText}</h3>
          <p>\${goodFactors} out of \${seoFactors.length} factors optimized</p>
        </div>
      </div>
      <div class="seo-factors">
    \`;
    
    seoFactors.forEach(factor => {
      html += \`
        <div class="factor">
          <div class="factor-header">
            <span class="factor-name">\${factor.name}</span>
            <span class="factor-status status-\${factor.status}">\${factor.status.charAt(0).toUpperCase() + factor.status.slice(1)}</span>
          </div>
          <div class="factor-details">\${factor.details}</div>
          <div class="factor-suggestion">\${factor.suggestion}</div>
        </div>
      \`;
    });
    
    html += \`
      </div>
      <button id="export-results" class="analyze-btn" style="margin-top: 1rem;">Export Results</button>
    \`;
    
    resultsDiv.innerHTML = html;
    resultsDiv.classList.remove('hidden');
    
    // Add export functionality
    document.getElementById('export-results').addEventListener('click', function() {
      alert('In a real extension, this would export the SEO analysis to PDF or CSV');
    });
    
    // Save results to storage
    chrome.storage.local.set({
      lastAnalysis: {
        url: pageData?.url,
        score: score,
        factors: seoFactors,
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
              content: `// This script runs on web pages and analyzes on-page SEO factors

function analyzePage() {
  // Get page metadata
  const title = document.title;
  const url = window.location.href;
  const metaTags = document.querySelectorAll('meta');
  
  // Get description meta tag
  let description = '';
  metaTags.forEach(tag => {
    if (tag.getAttribute('name') === 'description') {
      description = tag.getAttribute('content') || '';
    }
  });
  
  // Count headings
  const h1Elements = document.querySelectorAll('h1');
  const h2Elements = document.querySelectorAll('h2');
  const h3Elements = document.querySelectorAll('h3');
  
  // Analyze images
  const images = document.querySelectorAll('img');
  let imagesWithAlt = 0;
  images.forEach(img => {
    if (img.alt && img.alt.trim() !== '') {
      imagesWithAlt++;
    }
  });
  
  // Count words in the main content
  let textContent = '';
  
  // Try to find main content element
  const mainContent = document.querySelector('main') || 
                      document.querySelector('article') || 
                      document.querySelector('.content') || 
                      document.body;
  
  textContent = mainContent.textContent || '';
  const wordCount = textContent.split(/\\s+/).filter(word => word.length > 0).length;
  
  // Get all links
  const links = document.querySelectorAll('a');
  const internalLinks = [];
  const externalLinks = [];
  const currentDomain = window.location.hostname;
  
  links.forEach(link => {
    if (link.href) {
      try {
        const linkUrl = new URL(link.href);
        if (linkUrl.hostname === currentDomain) {
          internalLinks.push(link.href);
        } else {
          externalLinks.push(link.href);
        }
      } catch (e) {
        // Not a valid URL
      }
    }
  });
  
  return {
    title,
    url,
    description,
    h1Count: h1Elements.length,
    h2Count: h2Elements.length,
    h3Count: h3Elements.length,
    totalImages: images.length,
    imagesWithAlt,
    wordCount,
    internalLinksCount: internalLinks.length,
    externalLinksCount: externalLinks.length
  };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'analyzePage') {
    const analysisData = analyzePage();
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
  console.log('On-Page SEO Checker extension installed');
});

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle any background tasks here
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
      description: "On-Page SEO Checker template has been loaded!",
    });
  };

  return (
    <div className="container p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">On-Page SEO Checker Template</h1>
      <p className="text-lg text-muted-foreground mb-6">
        A Chrome extension to analyze and optimize on-page SEO factors for better search engine rankings.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Analyze title tags and meta descriptions</li>
            <li>Check heading structure (H1, H2, H3)</li>
            <li>Evaluate image optimization with alt text</li>
            <li>Analyze content length and quality</li>
            <li>Check URL structure and keywords</li>
            <li>Export SEO reports</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6">Use Cases</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Content creators optimizing web pages</li>
            <li>SEO specialists conducting page audits</li>
            <li>Marketers improving landing pages</li>
            <li>Bloggers enhancing post visibility</li>
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

export default OnPageSEOTemplate;
