import React from "react";
import { useRouter } from "expo-router";
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import { AddIcon, SearchIcon } from "@/components/ui/icon";

const AddBook = () => {
  const router = useRouter();

  const handlePressSearch = () => {
    router.push("/(app)/reading/search");
  };

  const handlePressNew = () => {
    router.push({
      pathname: "/(app)/reading/new",
    });
  };
  return (
    <ButtonGroup flexDirection="row" className="justify-end p-3">
      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={handlePressSearch}
      >
        <ButtonText>책 이름 검색</ButtonText>
        <ButtonIcon as={SearchIcon} />
      </Button>
      <Button
        size="md"
        variant="solid"
        action="secondary"
        onPress={handlePressNew}
      >
        <ButtonText>직접 입력</ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
    </ButtonGroup>
  );
};

export default AddBook;
