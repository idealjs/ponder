import {
  useSWRCreateState,
  useSwrManySchema,
} from "@idealjs/ponder-shared-browser";
import { nanoid } from "nanoid";
import { useCallback } from "react";

import Modal from "../components/Modal";
import { useSelectedSchemaId, useSetSelectedStateId } from "../store";

const query = {
  include: {
    states: true,
    transitions: true,
    actions: true,
  },
};

export const createStateModalId = "create-state-modal";

const CreateStateModal = () => {
  const { trigger } = useSWRCreateState();
  const { mutate } = useSwrManySchema(query);

  const setSelectedStateId = useSetSelectedStateId();
  const selectedSchemaId = useSelectedSchemaId();

  const onCreateNewState = useCallback(async () => {
    const id = nanoid();

    await trigger({
      data: {
        id,
        schemaId: selectedSchemaId,
      },
    });

    await mutate();

    setSelectedStateId(id);
  }, [mutate, selectedSchemaId, setSelectedStateId, trigger]);

  return (
    <Modal id={createStateModalId}>
      <h3 className="font-bold text-lg">Create A New State</h3>
      <p className="py-4">You can set name after create.</p>
      <div className="modal-action">
        <label
          className="btn"
          htmlFor={createStateModalId}
          onClick={onCreateNewState}
        >
          Create
        </label>
      </div>
    </Modal>
  );
};

export default CreateStateModal;
