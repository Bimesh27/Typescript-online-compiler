import { Loader2, PlayIcon, SquareTerminal } from "lucide-react";
import { Button } from "./ui/button";
import { FaCode } from "react-icons/fa";
import React from "react";
import { cn } from "@/lib/utils";
import SelectFontSize from "./SelectFontSize";
import SelectFontFamily from "./SelectFontFamily";

interface Props {
  CustomiserSide: "left" | "right";
  isLoading: boolean;
  runCode: () => Promise<void>;
}

const LeftCustomizer = ({ CustomiserSide, isLoading, runCode }: Props) => {
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

        <div className="flex gap-6">
          <SelectFontFamily />
          <SelectFontSize />
          <Button
            className="bg-blue-600 hover:bg-blue-700 transition-all dark:text-white rounded-none"
            onClick={runCode}
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
