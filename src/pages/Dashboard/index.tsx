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
  ModalFooter,
  ModalCloseButton,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import useStore from "../../hooks/useStore";
import { FaPlusCircle } from "react-icons/fa";

const Dashboard = () => {
  const { token, applicationNames, getApplicationNames } = useStore();
  const {
    isOpen: isOpenDecrypt,
    onOpen: onOpenDecrypt,
    onClose: onCloseDecrypt,
  } = useDisclosure();
  const {
    isOpen: isOpenEncrypt,
    onOpen: onOpenEncrypt,
    onClose: onCloseEncrypt,
  } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [decryptedData, setDecryptedData] = useState({
    application: "",
    username: "",
    password: "",
  });
  const [encryptData, setEncryptData] = useState({
    application: "",
    username: "",
    password: "",
  });

  const handleOpenDecryptModal = async (app: string, index: number) => {
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
      setDecryptedData((decryptedData) => ({
        ...decryptedData,
        application: app,
        username: response.username,
        password: response.password,
      }));
    }
    setIsLoading(false);
    onOpenDecrypt();
  };

  const handleEncryptInputChange = (event: any, type: string) => {
    setEncryptData((encryptData) => ({
      ...encryptData,
      [type]: event.target.value,
    }));
  };

  const handleEncrypt = async () => {
    const rawResponse: any = await fetch(
      "https://anypass-backend.herokuapp.com/encrypt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          application: encryptData.application,
          username: encryptData.username,
          password: encryptData.password,
        }),
      }
    );
    if (rawResponse.status === 200) {
      await getApplicationNames();
      onCloseEncrypt();
    }
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
        <Flex justifyContent="space-between" alignItems="center" gap="20px">
          <Heading color="teal.400">Credentials</Heading>
          <FaPlusCircle
            size={24}
            color="gray.300"
            cursor="pointer"
            onClick={onOpenEncrypt}
          />
        </Flex>
        <Flex
          direction="column"
          gap="20px"
          mt="40px"
          width="300px"
          height="400px"
          overflowX="scroll"
          alignItems="center"
        >
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
                <Button onClick={() => handleOpenDecryptModal(app, index)}>
                  Decrypt
                </Button>
              </Flex>
            ))
          )}
        </Flex>
      </Flex>

      <Modal isOpen={isOpenDecrypt} onClose={onCloseDecrypt} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{decryptedData.application}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="10px">
            {`Username: ${decryptedData.username}`} <br />
            {`Password: ${decryptedData.password}`}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenEncrypt} onClose={onCloseEncrypt} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Encrypt</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="10px" display="flex" flexDirection="column" gap="10px">
            <Input
              placeholder="application"
              size="md"
              onChange={(e) => handleEncryptInputChange(e, "application")}
            />
            <Input
              placeholder="username"
              size="md"
              onChange={(e) => handleEncryptInputChange(e, "username")}
            />
            <Input
              placeholder="password"
              size="md"
              onChange={(e) => handleEncryptInputChange(e, "password")}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleEncrypt}
              isDisabled={
                encryptData.application === "" ||
                encryptData.username === "" ||
                encryptData.password === ""
              }
            >
              Encrypt
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Dashboard;
