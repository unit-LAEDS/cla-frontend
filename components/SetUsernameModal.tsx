import { Button, Modal, TextInput } from "@mantine/core";
import { UserContext } from "context";
import { useContext, useState } from "react";

type SetUsernameType = {
  opened: boolean;
};

const SetUsernameModal = ({ opened }: SetUsernameType) => {
  const [modalState, setModalState] = useState(opened);

  console.log("here");

  return (
    <Modal opened={opened} onClose={() => setModalState(false)}>
      <TextInput label="Your email" placeholder="Your email" data-autofocus />
      <Button fullWidth onClick={() => setModalState(false)} mt="md">
        Submit
      </Button>
    </Modal>
  );
};

export default SetUsernameModal;
