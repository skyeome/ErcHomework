import { View } from "react-native";
import { useAuth } from "../context/auth";
import { useState } from "react";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Divider } from "@/components/ui/divider";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleLogin = async () => {
    try {
      await login("dummy-token");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await login("guest-token");
    } catch (error) {
      console.error("Guest login failed:", error);
    }
  };

  return (
    <Center className="flex-1 bg-background-50">
      <Box className="w-full max-w-[400px] p-6">
        <VStack space="xl" className="w-full">
          <Center>
            <Text className="text-3xl font-bold text-typography-900">
              Welcome to ERC Homework
            </Text>
          </Center>

          <VStack space="md" className="w-full">
            <VStack space="xs">
              <Text className="text-typography-500">Email</Text>
              <Input>
                <InputField
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text className="text-typography-500">Password</Text>
              <Input>
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <InputSlot onPress={handleState}>
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            </VStack>

            <Button
              size="lg"
              variant="solid"
              action="primary"
              onPress={handleLogin}
              className="mt-4"
            >
              <ButtonText>Login</ButtonText>
            </Button>
          </VStack>

          <HStack space="sm" className="items-center">
            <Divider className="flex-1" />
            <Text className="text-typography-400">OR</Text>
            <Divider className="flex-1" />
          </HStack>

          <Button
            size="lg"
            variant="outline"
            action="secondary"
            onPress={handleGuestLogin}
          >
            <ButtonText>Continue as Guest</ButtonText>
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
