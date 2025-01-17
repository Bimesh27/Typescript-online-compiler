"use client";

import Customizer from "@/components/Customiser";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [fontSize, setFontSize] = useState<number>(15);
  const defaultValue =
    "const helloMom = () => {\n \tconsole.log('Hello Mom');\n} \n \nhelloMom()";
  const [code, setCode] = useState(defaultValue);
  const [codeOutput, setCodeOutput] = useState<string>("");
  console.log(codeOutput);

  return (
    <div className="w-full max-h-[calc(100vh-4rem)] flex items-center overflow-hidden flex-col">
      <div className="w-full h-full">
        <ResizablePanelGroup
          className="min-h[calc(100vh-16rem)] w-full border"
          direction="horizontal"
        >
          <ResizablePanel defaultSize={60} minSize={40}>
            <Customizer
              code={code}
              setCodeOutput={setCodeOutput}
              CustomiserSide="left"
            />
            <MonacoEditor
              language="typescript"
              theme={`${theme === "dark" ? "vs-dark" : "light"}`}
              height="80vh"
              options={{
                fontSize,
                minimap: {
                  enabled: false,
                },
                scrollbar: {
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10,
                },
              }}
              value={defaultValue}
              onChange={(value) => setCode(value || "")}
              className="overflow-hidden"
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40} minSize={20}>
            <Customizer
              code={code}
              setCodeOutput={setCodeOutput}
              CustomiserSide={"right"}
            />
            <p className="whitespace-pre-wrap">{codeOutput}</p>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
