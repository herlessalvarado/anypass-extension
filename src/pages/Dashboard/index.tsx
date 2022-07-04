import {
  Flex,
  Heading,
  Box,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { token, applicationNames } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentApp, setCurrentApp] = useState("");

  const handleOpenModal = async (app: string, index: number) => {
    setIsLoading(true);
    const rawResponse: any = await fetch(
      "https://anypass-backend.herokuapp.com/decrypt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          index: index,
          application: app,
        }),
      }
    );
    if (rawResponse.status === 200) {
      const response = await rawResponse.json();
      setUsername(response.username);
      setPassword(response.password);
      setCurrentApp(app);
    }
    setIsLoading(false);
    onOpen();
  };

  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="teal.400">Credenciales</Heading>
        <Flex direction="column" gap="20px" mt="40px">
          {isLoading ? (
            <Spinner color="teal" />
          ) : (
            applicationNames.map((app, index) => (
              <Flex
                key={index}
                justifyContent="center"
                alignItems="center"
                gap="10px"
              >
                <Box>{app}</Box>
                <Button onClick={() => handleOpenModal(app, index)}>
                  Decrypt
                </Button>
              </Flex>
            ))
          )}
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentApp}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="10px">
            {`Username: ${username}`} <br />
            {`Password: ${password}`}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Dashboard;
