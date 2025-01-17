"use client";

import { Loader2, PlayIcon, SquareTerminal } from "lucide-react";
import { Button } from "./ui/button";
import { FaCode } from "react-icons/fa";
import React, { SetStateAction } from "react";
import { runCode } from "@/actions/code.action";
import { cn } from "@/lib/utils";
import SelectFontSize from "./SelectFontSize";

interface Props {
  code: string;
  setCodeOutput: React.Dispatch<SetStateAction<string>>;
  CustomiserSide: "left" | "right";
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setOutputFooter: React.Dispatch<SetStateAction<string>>;
}

const LeftCustomizer = ({
  code,
  setCodeOutput,
  CustomiserSide,
  isLoading,
  setIsLoading,
  setOutputFooter,
}: Props) => {
  const handleRun = () => {
    runCode({ code, setCodeOutput, setIsLoading, setOutputFooter });
  };

  return (
    <div className="w-full h-14 flex">
      <section
        className={cn(
          "flex-1 border-b w-full flex items-center px-10 justify-between",
          CustomiserSide === "right" && "hidden"
        )}
      >
        <div className="flex w-full items-center">
          <p className="mr-4 flex gap-2 items-center font-semibold">
            Code <FaCode className="mt-[2px] text-blue-500 text-2xl" />
          </p>
        </div>

        <div className="flex gap-6 w-full">
          <SelectFontSize />
          <Button
            className="bg-blue-600 hover:bg-blue-700 transition-all dark:text-white rounded-none"
            onClick={handleRun}
            disabled={isLoading}
          >
            Run
            {!isLoading ? <PlayIcon /> : <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </section>
      <section
        className={cn(
          "flex-1 border-b w-full flex items-center px-10",
          CustomiserSide === "left" && "hidden"
        )}
      >
        <p className="font-semibold flex items-center gap-3">
          Output <SquareTerminal />
        </p>
      </section>
    </div>
  );
};

export default LeftCustomizer;
