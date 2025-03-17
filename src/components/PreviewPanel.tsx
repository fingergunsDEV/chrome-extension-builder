
interface PreviewPanelProps {
  html: string;
  css: string;
  js: string;
}

const PreviewPanel = ({ html, css, js }: PreviewPanelProps) => {
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
    <div className="glass-panel rounded-lg p-2 md:p-4 h-full animate-fade-in bg-card/50 backdrop-blur-sm shadow-xl">
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
        className="w-full h-[calc(100vh-290px)] sm:h-[calc(100vh-250px)] rounded border border-border/30 bg-white"
        title="Extension Preview"
        sandbox="allow-scripts"
        aria-label="Live preview of your extension"
      />
    </div>
  );
};

export default PreviewPanel;
