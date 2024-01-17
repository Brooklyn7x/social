import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Filter() {
    
  return (
    <Select>
      <SelectTrigger className="w-20">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">All</SelectItem>
        <SelectItem value="2">Latest</SelectItem>
        <SelectItem value="3">Older</SelectItem>
      </SelectContent>
    </Select>
  );
}
