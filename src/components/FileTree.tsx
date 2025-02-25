
import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText } from "lucide-react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
}

const TreeNode = ({ 
  node, 
  level = 0,
  onSelect,
  selectedFile
}: { 
  node: FileNode; 
  level?: number;
  onSelect: (node: FileNode) => void;
  selectedFile?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-1 py-1 px-2 hover:bg-secondary rounded cursor-pointer ${
          selectedFile === node.name ? "bg-secondary" : ""
        }`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => {
          if (node.type === "folder") {
            setIsOpen(!isOpen);
          } else {
            onSelect(node);
          }
        }}
      >
        {node.type === "folder" && (
          <>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
            {isOpen ? (
              <FolderOpen className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Folder className="w-4 h-4 text-muted-foreground" />
            )}
          </>
        )}
        {node.type === "file" && (
          <>
            <span className="w-4" />
            <FileText className="w-4 h-4 text-muted-foreground" />
          </>
        )}
        <span className="text-sm">{node.name}</span>
      </div>
      {isOpen && node.children?.map((child, index) => (
        <TreeNode 
          key={index} 
          node={child} 
          level={level + 1} 
          onSelect={onSelect}
          selectedFile={selectedFile}
        />
      ))}
    </div>
  );
};

const FileTree = ({ 
  onFileSelect, 
  selectedFile 
}: { 
  onFileSelect: (node: FileNode) => void;
  selectedFile?: string;
}) => {
  const files: FileNode[] = [
    {
      name: "manifest.json",
      type: "file",
      content: `{
  "manifest_version": 3,
  "name": "My Extension",
  "version": "1.0",
  "description": "A basic Chrome extension"
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
              content: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Extension</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>"
            },
            { 
              name: "popup.css", 
              type: "file",
              content: "body {\n  width: 300px;\n  padding: 1rem;\n}"
            },
            { 
              name: "popup.js", 
              type: "file",
              content: "console.log('Popup script loaded');"
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
              content: "chrome.runtime.onInstalled.addListener(() => {\n  console.log('Extension installed');\n});"
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="w-64 border-r h-full p-2">
      {files.map((file, index) => (
        <TreeNode 
          key={index} 
          node={file} 
          onSelect={onFileSelect}
          selectedFile={selectedFile}
        />
      ))}
    </div>
  );
};

export default FileTree;
