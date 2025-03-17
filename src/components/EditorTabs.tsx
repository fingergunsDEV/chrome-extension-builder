
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CodeEditorPanel from "./CodeEditorPanel";

interface EditorTabsProps {
  currentEditorTab: string;
  setCurrentEditorTab: (tab: string) => void;
  html: string;
  setHtml: (html: string) => void;
  css: string;
  setCss: (css: string) => void;
  js: string;
  setJs: (js: string) => void;
}

const EditorTabs = ({
  currentEditorTab,
  setCurrentEditorTab,
  html,
  setHtml,
  css,
  setCss,
  js,
  setJs
}: EditorTabsProps) => {
  return (
    <Tabs 
      value={currentEditorTab} 
      onValueChange={setCurrentEditorTab} 
      className="h-full flex flex-col"
    >
      <TabsList className="w-full justify-start border-b rounded-none bg-card px-2 pt-2 overflow-x-auto scrollbar-none">
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
  );
};

export default EditorTabs;
