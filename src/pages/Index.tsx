
import { useState } from "react";
import { Code, Layout, Eye, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileTree from "@/components/FileTree";

const CodeEditorPanel = ({ content, onChange, language }: { content: string; onChange: (value: string) => void; language: string }) => {
  return (
    <div className="editor-container min-h-[300px] animate-fade-in">
      <div className="flex items-center justify-between mb-2 text-editor-line">
        <span className="text-sm">{language}</span>
        <Save className="w-4 h-4 hover:text-white cursor-pointer" onClick={() => toast({ title: "Changes saved", description: "Your code has been saved successfully." })} />
      </div>
      <textarea
        className="w-full h-[calc(100%-2rem)] bg-transparent resize-none focus:outline-none"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

const Index = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    <div className="flex h-screen">
      {isSidebarOpen && <FileTree />}
      <div className="flex-1 overflow-auto">
        <div className="container p-4">
          <header className="mb-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-secondary rounded-lg"
              >
                <Layout className="w-4 h-4" />
              </button>
              <h1 className="text-4xl font-bold">Chrome Extension Builder</h1>
            </div>
            <p className="text-muted-foreground">Create your extension with live preview</p>
          </header>

          <div className="flex gap-4 mb-4 animate-slide-up">
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg hover-effect ${
                activeTab === "editor" ? "bg-primary text-primary-foreground" : "bg-secondary"
              }`}
            >
              <Code className="w-4 h-4" />
              Editor
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg hover-effect ${
                activeTab === "preview" ? "bg-primary text-primary-foreground" : "bg-secondary"
              }`}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {activeTab === "editor" ? (
              <div className="space-y-6 animate-fade-in">
                <CodeEditorPanel
                  content={html}
                  onChange={setHtml}
                  language="HTML"
                />
                <CodeEditorPanel
                  content={css}
                  onChange={setCss}
                  language="CSS"
                />
                <CodeEditorPanel
                  content={js}
                  onChange={setJs}
                  language="JavaScript"
                />
              </div>
            ) : (
              <div className="col-span-2 glass-panel rounded-lg p-4 min-h-[300px] animate-fade-in">
                <iframe
                  srcDoc={combinedCode}
                  className="w-full h-[500px] rounded border border-border"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
