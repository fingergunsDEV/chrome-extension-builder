
import { useState, useEffect } from "react";
import { Code, Eye } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import FileTree from "@/components/FileTree";
import SideMenu from "@/components/SideMenu";
import Header from "@/components/Header";
import EditorTabs from "@/components/EditorTabs";
import CodeEditorPanel from "@/components/CodeEditorPanel";
import PreviewPanel from "@/components/PreviewPanel";

interface FileContent {
  name: string;
  content: string;
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<FileContent | null>(null);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [currentEditorTab, setCurrentEditorTab] = useState("html");
  const isMobile = useIsMobile();

  // Auto-close sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

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
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            setIsSideMenuOpen={setIsSideMenuOpen}
          />

          <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6 px-4 animate-slide-up">
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 shadow-sm ${
                activeTab === "editor" 
                  ? "bg-primary text-primary-foreground shadow-primary/20" 
                  : "bg-secondary hover:bg-secondary/80"
              }`}
              aria-pressed={activeTab === "editor"}
            >
              <Code className="w-4 h-4" />
              <span className="text-sm md:text-base">Editor</span>
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 shadow-sm ${
                activeTab === "preview" 
                  ? "bg-primary text-primary-foreground shadow-primary/20" 
                  : "bg-secondary hover:bg-secondary/80"
              }`}
              aria-pressed={activeTab === "preview"}
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm md:text-base">Preview</span>
            </button>
          </div>

          <div className="flex-1 px-2 md:px-4 pb-4">
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
                  <EditorTabs
                    currentEditorTab={currentEditorTab}
                    setCurrentEditorTab={setCurrentEditorTab}
                    html={html}
                    setHtml={setHtml}
                    css={css}
                    setCss={setCss}
                    js={js}
                    setJs={setJs}
                  />
                )}
              </div>
            ) : (
              <PreviewPanel html={html} css={css} js={js} />
            )}
          </div>
          
          <div className="mt-auto px-4 pb-2 text-center text-xs sm:text-sm text-muted-foreground">
            <p>Tip: Use Emmet shorthand in HTML files (e.g. <code className="bg-muted px-1 rounded">div.container</code> + Tab)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
