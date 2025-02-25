
import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText } from "lucide-react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

const TreeNode = ({ node, level = 0 }: { node: FileNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-1 py-1 px-2 hover:bg-secondary rounded cursor-pointer"
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => node.type === "folder" && setIsOpen(!isOpen)}
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
            <span className="w-4" /> {/* Spacing for alignment */}
            <FileText className="w-4 h-4 text-muted-foreground" />
          </>
        )}
        <span className="text-sm">{node.name}</span>
      </div>
      {isOpen && node.children?.map((child, index) => (
        <TreeNode key={index} node={child} level={level + 1} />
      ))}
    </div>
  );
};

const FileTree = () => {
  const files: FileNode[] = [
    {
      name: "manifest.json",
      type: "file"
    },
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "pages",
          type: "folder",
          children: [
            { name: "popup.html", type: "file" },
            { name: "popup.css", type: "file" },
            { name: "popup.js", type: "file" }
          ]
        },
        {
          name: "background",
          type: "folder",
          children: [
            { name: "background.js", type: "file" }
          ]
        }
      ]
    }
  ];

  return (
    <div className="w-64 border-r h-full p-2">
      {files.map((file, index) => (
        <TreeNode key={index} node={file} />
      ))}
    </div>
  );
};

export default FileTree;
