import { useState } from "react";
import { ArrowRight, Code } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SchemaGeneratorTemplate = () => {
  const handleUseTemplate = () => {
    toast({
      title: "Template Selected",
      description: "Schema Markup Generator template has been loaded!",
    });
  };

  return (
    <div className="container p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Schema Markup Generator Template</h1>
      <p className="text-lg text-muted-foreground mb-6">
        A Chrome extension to create and validate schema.org markup for enhanced search results.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Generate JSON-LD schema markup for various content types</li>
            <li>Validate existing schema markup on web pages</li>
            <li>Preview rich snippets in search results</li>
            <li>Easy copy-and-paste implementation</li>
            <li>Support for multiple schema types (Article, Product, FAQ, etc.)</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6">Use Cases</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>SEO specialists implementing structured data</li>
            <li>Content creators optimizing for rich snippets</li>
            <li>Developers adding schema markup to websites</li>
            <li>E-commerce sites implementing product schema</li>
          </ul>
          
          <button 
            className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
            onClick={handleUseTemplate}
          >
            Use This Template
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="border rounded-lg overflow-hidden bg-editor-bg p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Code className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-editor-text text-xl font-semibold mb-2">Schema Markup Generator</h3>
            <p className="text-editor-line">Create structured data for rich snippets</p>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Template Code Structure</h2>
        <p className="text-muted-foreground mb-4">
          This Chrome extension template includes:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">manifest.json</h3>
            <p className="text-sm text-muted-foreground">Base configuration with permissions for activeTab and storage</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">popup.html/js/css</h3>
            <p className="text-sm text-muted-foreground">UI for selecting schema types and generating markup</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">content.js</h3>
            <p className="text-sm text-muted-foreground">Extracts page data for schema generation</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">background.js</h3>
            <p className="text-sm text-muted-foreground">Background service worker for the extension</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">schemas/article.js</h3>
            <p className="text-sm text-muted-foreground">Template for Article schema markup</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">schemas/product.js</h3>
            <p className="text-sm text-muted-foreground">Template for Product schema markup</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">schemas/faq.js</h3>
            <p className="text-sm text-muted-foreground">Template for FAQ schema markup</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">schemas/local-business.js</h3>
            <p className="text-sm text-muted-foreground">Template for LocalBusiness schema markup</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">utils/validator.js</h3>
            <p className="text-sm text-muted-foreground">Schema validation tools</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaGeneratorTemplate;
