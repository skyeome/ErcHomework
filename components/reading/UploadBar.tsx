import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { TouchableOpacity } from "react-native";

const UploadBar = () => {
  const theme = useColorScheme();

  return (
    <Box className="bg-background-50">
      <HStack>
        <TouchableOpacity className="h-16 w-16 p-4" onPress={() => {}}>
          <MaterialIcons
            name="image"
            size={30}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity className="h-16 w-16 p-4" onPress={() => {}}>
          <MaterialIcons
            name="mic"
            size={30}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default UploadBar;
