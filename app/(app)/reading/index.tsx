import { Box } from "@/components/ui/box";
import AddBook from "@/components/reading/AddBook";
import ReadBooks from "@/components/reading/ReadBooks";

export default function Reading() {
  return (
    <Box className="flex-1">
      <AddBook />
      <ReadBooks />
    </Box>
  );
}
