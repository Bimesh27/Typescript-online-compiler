import { useGlobalState } from "@/context/global.context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFromLocalStorage, setLocalStorage } from "@/lib/localStorageUtils";

// Replace with your actual library
const FontSizeSelector: React.FC = () => {
  const { fontSize, setFontSize } = useGlobalState();
  const fontSizes = [16, 18, 20, 22, 24]; // Example font sizes

  return (
    <Select
      defaultValue={getFromLocalStorage("font-size") || fontSize.toString()}
      onValueChange={(value) => {
        setFontSize(Number(value));
        setLocalStorage("font-size", value);
      }}
    >
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Font size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {fontSizes.map((size) => (
            <SelectItem value={size.toString()} key={size}>
              {size}px
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FontSizeSelector;
