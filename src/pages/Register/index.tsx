import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import useStore from "../../hooks/useStore";
import { CirclePicker } from "react-color";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = () => {
  const { register } = useStore();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleColorChange = (color: any) => {
    setColorCode(color.hex);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const success = await register(email, password, colorCode);
    if (success)
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    else
      toast({
        title: "Unable to create account.",
        description: "Please check if the email is valid or try again later.",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    setIsLoading(false);
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Register</Heading>
        {isLoading ? (
          <Spinner color="teal" />
        ) : (
          <Box>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <CirclePicker onChangeComplete={handleColorChange} />
                <Button
                  borderRadius={0}
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  onClick={handleRegister}
                  isDisabled={
                    email === "" || password === "" || colorCode === ""
                  }
                >
                  Register
                </Button>
              </Stack>
            </form>
          </Box>
        )}
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link as={NavLink} to="/login" color="teal.500">
          Log In
        </Link>
      </Box>
    </Flex>
  );
};

export default Register;
