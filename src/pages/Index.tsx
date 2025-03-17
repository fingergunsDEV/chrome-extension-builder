
import { useState, KeyboardEvent } from "react";
import { Code, Layout, Eye, Save, Menu } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileTree from "@/components/FileTree";
import SideMenu from "@/components/SideMenu";
import { expandEmmet } from "@/utils/emmetHelper";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface FileContent {
  name: string;
  content: string;
}

const CodeEditorPanel = ({ 
  content, 
  onChange, 
  language,
  fileName
}: { 
  content: string; 
  onChange: (value: string) => void; 
  language: string;
  fileName?: string;
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key handling
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      const newValue = content.substring(0, start) + '  ' + content.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
      }, 0);
    }
    
    // Emmet expansion with Tab key after typing an abbreviation
    if (e.key === 'Tab' && !e.shiftKey) {
      const start = e.currentTarget.selectionStart;
      const textBeforeCursor = content.substring(0, start);
      
      // Check if there's a potential Emmet abbreviation before the cursor
      const abbreviationMatch = textBeforeCursor.match(/[a-zA-Z0-9.#\{\}]+$/);
      
      if (abbreviationMatch) {
        const abbreviation = abbreviationMatch[0];
        const abbreviationStart = start - abbreviation.length;
        
        // Only try to expand if we're in HTML mode
        if (language.toLowerCase() === 'html') {
          const expanded = expandEmmet(abbreviation);
          
          // If expansion changed something, replace the abbreviation
          if (expanded !== abbreviation) {
            e.preventDefault();
            
            const newValue = content.substring(0, abbreviationStart) + expanded + content.substring(start);
            onChange(newValue);
            
            // Position cursor at the end of the expanded HTML
            setTimeout(() => {
              e.currentTarget.selectionStart = e.currentTarget.selectionEnd = abbreviationStart + expanded.length;
            }, 0);
          }
        }
      }
    }
  };

  return (
    <div className="editor-container min-h-[300px] h-[calc(100vh-240px)] animate-fade-in shadow-lg border border-border/30">
      <div className="flex items-center justify-between mb-2 text-editor-line bg-editor-bg/40 p-2 rounded-t-lg">
        <span className="text-sm font-medium">{fileName || language}</span>
        <Save 
          className="w-4 h-4 hover:text-white cursor-pointer transition-colors" 
          onClick={() => toast({ 
            title: "Changes saved", 
            description: `${fileName || language} has been saved successfully.` 
          })} 
        />
      </div>
      <textarea
        className="w-full h-[calc(100%-2rem)] bg-transparent resize-none focus:outline-none p-4 font-mono text-sm"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        placeholder={`Write your ${language} code here...`}
      />
    </div>
  );
};

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<FileContent | null>(null);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [currentEditorTab, setCurrentEditorTab] = useState("html");

  const combinedCode = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Side Menu */}
      <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
      
      {/* File tree sidebar */}
      {isSidebarOpen && (
        <div className="w-64 border-r border-border/30 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <FileTree 
            onFileSelect={(node) => {
              if (node.type === "file") {
                setSelectedFile({ name: node.name, content: node.content || "" });
              }
            }}
            selectedFile={selectedFile?.name}
          />
        </div>
      )}
      
      <div className="flex-1 overflow-auto">
        <div className="h-full flex flex-col">
          <header className="p-4 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Toggle file tree"
              >
                <Layout className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setIsSideMenuOpen(true)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Open side menu"
              >
                <Menu className="w-4 h-4" />
              </button>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Chrome Extension Builder</h1>
            </div>
            <p className="text-muted-foreground">Create your extension with live preview and Emmet support</p>
          </header>

          <div className="flex gap-4 mb-6 px-4 animate-slide-up">
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm ${
                activeTab === "editor" 
                  ? "bg-primary text-primary-foreground shadow-primary/20" 
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              <Code className="w-4 h-4" />
              Editor
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm ${
                activeTab === "preview" 
                  ? "bg-primary text-primary-foreground shadow-primary/20" 
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>

          <div className="flex-1 px-4 pb-4">
            {activeTab === "editor" ? (
              <div className="h-full animate-fade-in">
                {selectedFile ? (
                  <div className="bg-card rounded-lg shadow-xl overflow-hidden h-full">
                    <CodeEditorPanel
                      content={selectedFile.content}
                      onChange={(content) => setSelectedFile({ ...selectedFile, content })}
                      language={selectedFile.name.split('.').pop()?.toUpperCase() || ""}
                      fileName={selectedFile.name}
                    />
                  </div>
                ) : (
                  <Tabs 
                    value={currentEditorTab} 
                    onValueChange={setCurrentEditorTab} 
                    className="h-full flex flex-col"
                  >
                    <TabsList className="w-full justify-start border-b rounded-none bg-card px-2 pt-2">
                      <TabsTrigger value="html" className="data-[state=active]:bg-editor-bg data-[state=active]:text-editor-text">HTML</TabsTrigger>
                      <TabsTrigger value="css" className="data-[state=active]:bg-editor-bg data-[state=active]:text-editor-text">CSS</TabsTrigger>
                      <TabsTrigger value="js" className="data-[state=active]:bg-editor-bg data-[state=active]:text-editor-text">JavaScript</TabsTrigger>
                    </TabsList>
                    <div className="flex-1 mt-0">
                      <TabsContent value="html" className="m-0 h-full">
                        <CodeEditorPanel
                          content={html}
                          onChange={setHtml}
                          language="HTML"
                        />
                      </TabsContent>
                      <TabsContent value="css" className="m-0 h-full">
                        <CodeEditorPanel
                          content={css}
                          onChange={setCss}
                          language="CSS"
                        />
                      </TabsContent>
                      <TabsContent value="js" className="m-0 h-full">
                        <CodeEditorPanel
                          content={js}
                          onChange={setJs}
                          language="JavaScript"
                        />
                      </TabsContent>
                    </div>
                  </Tabs>
                )}
              </div>
            ) : (
              <div className="glass-panel rounded-lg p-4 h-full animate-fade-in bg-card/50 backdrop-blur-sm shadow-xl">
                <div className="bg-secondary/30 p-2 mb-2 rounded-lg flex items-center">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                  </div>
                  <div className="mx-auto text-xs text-muted-foreground">Preview</div>
                </div>
                <iframe
                  srcDoc={combinedCode}
                  className="w-full h-[calc(100vh-290px)] rounded border border-border/30 bg-white"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </div>
            )}
          </div>
          
          <div className="mt-auto px-4 pb-2 text-center text-sm text-muted-foreground">
            <p>Tip: Use Emmet shorthand in HTML files (e.g. <code className="bg-muted px-1 rounded">div.container</code> + Tab)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
