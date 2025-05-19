import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";

const New = () => {
  return (
    <FormControl className="p-4">
      <VStack space="xl">
        <VStack space="xs">
          <Heading className="pb-5 text-typography-900">
            Enter Your Homework Information
          </Heading>
          <Text className="text-typography-500">Title</Text>
          <Input className="min-w-[250px]">
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Button className="w-full" variant="outline">
            <ButtonText className="text-typography-900">
              Upload Again
            </ButtonText>
          </Button>
          <Button className="w-full">
            <ButtonText className="text-typography-0">
              Submit Homework
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </FormControl>
  );
};

export default New;
