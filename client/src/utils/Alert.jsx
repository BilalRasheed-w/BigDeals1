import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Stack,
} from "@chakra-ui/react";

const AlertComponent = ({ status, message }) => {
  return (
    <>
      <Alert status={status}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </>
  );
};

export default AlertComponent;
