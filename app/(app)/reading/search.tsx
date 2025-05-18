import { useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import Ionicons from "@expo/vector-icons/Ionicons";

const Search = () => {
  const router = useRouter();
  const theme = useColorScheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const savedSearches = await AsyncStorage.getItem("recentSearches");
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches));
        }
      } catch (error) {
        console.error("Failed to load recent searches", error);
      }
    };

    loadRecentSearches();
  }, []);

  const saveSearchTerm = async (term: string) => {
    if (term.trim() === "") return;

    const updatedSearches = [
      term,
      ...recentSearches.filter((search) => search !== term),
    ];
    setRecentSearches(updatedSearches);

    try {
      await AsyncStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedSearches),
      );
    } catch (error) {
      console.error("Failed to save search term", error);
    }
  };

  const clearRecentSearches = async () => {
    setRecentSearches([]);
    try {
      await AsyncStorage.removeItem("recentSearches");
    } catch (error) {
      console.error("Failed to clear recent searches", error);
    }
  };

  const handleSubmitEditing = () => {
    if (searchTerm.trim() === "") return;

    saveSearchTerm(searchTerm);
    router.push({
      pathname: "/(app)/reading/searchResult",
      params: { searchTerm },
    });
    setSearchTerm("");
  };

  const handleRecentSearchPress = (item: string) => {
    router.push({
      pathname: "/(app)/reading/searchResult",
      params: { searchTerm: item },
    });
  };

  return (
    <Box className="p-4">
      {/* 검색 입력란 */}
      <Input>
        <InputSlot className="pl-3">
          <Ionicons
            name="search-outline"
            size={20}
            color={theme === "dark" ? "white" : "black"}
          />
        </InputSlot>
        <InputField
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSubmitEditing}
          placeholder="책 제목을 입력하세요"
        />
        {searchTerm && (
          <InputSlot className="pr-3">
            <Button
              variant="link"
              onPress={() => setSearchTerm("")}
              className="p-0"
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={theme === "dark" ? "#fff" : "black"}
              />
            </Button>
          </InputSlot>
        )}
      </Input>

      {recentSearches.length > 0 && (
        <>
          <Box className="mt-4">
            <FlatList
              data={recentSearches}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleRecentSearchPress(item)}>
                  <Box className="border-b border-gray-300 p-2 dark:border-gray-700">
                    <Text>{item}</Text>
                  </Box>
                </TouchableOpacity>
              )}
            />
          </Box>
          <Box className="mt-4">
            <Button variant="link" onPress={clearRecentSearches}>
              <Text>최근 검색어 지우기</Text>
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Search;
