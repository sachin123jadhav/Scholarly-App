import { createStandaloneToast } from "@chakra-ui/react";

const Alerts = (props) => {
  const { toast } = createStandaloneToast();

  return toast({
    title: props.title,
    description: props.description,
    status: props.status,
    duration: props.duration || 5000,
    isClosable: props.isClosable || true,
  });
};

export default Alerts;
