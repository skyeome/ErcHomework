import React from "react";
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import { AddIcon, SearchIcon } from "@/components/ui/icon";

const AddBook = () => {
  return (
    <ButtonGroup flexDirection="row" className="p-3 justify-end">
      <Button size="md" variant="solid" action="primary">
        <ButtonText>책 이름 검색</ButtonText>
        <ButtonIcon as={SearchIcon} />
      </Button>
      <Button size="md" variant="solid" action="secondary">
        <ButtonText>직접 입력</ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
    </ButtonGroup>
  );
};

export default AddBook;
