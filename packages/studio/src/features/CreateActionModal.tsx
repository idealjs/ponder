import { nanoid } from "nanoid";
import { useCallback } from "react";

import Modal from "../components/Modal";
import { useSWRCreateAction, useSwrManySchema } from "../generated/swr";
import { useSelectedSchemaId, useSelectedState } from "../store";
import schemaQuery from "./schemaQuery";

export const createAdtionModalId = "create-action-modal";

const CreateActionModal = () => {
  const { trigger } = useSWRCreateAction();
  const { mutate } = useSwrManySchema(schemaQuery);

  const selectedSchemaId = useSelectedSchemaId();
  const selectedState = useSelectedState();

  const onCreateNewAction = useCallback(async () => {
    const id = nanoid();

    await trigger({
      data: {
        id,
        schema: {
          connect: {
            id: selectedSchemaId,
          },
        },
        transitions: {
          connect:
            selectedState?.transitionId == null
              ? undefined
              : {
                  id: selectedState.transitionId,
                },
          create:
            selectedState?.transitionId != null
              ? undefined
              : {
                  id: nanoid(),
                  startFromState: {
                    connect: {
                      id: selectedState?.id,
                    },
                  },
                  schema: {
                    connect: {
                      id: selectedSchemaId,
                    },
                  },
                },
        },
      },
    });

    await mutate();
  }, [mutate, selectedSchemaId, selectedState, trigger]);

  return (
    <Modal id={createAdtionModalId}>
      <h3 className="font-bold text-lg">Create A New Modal</h3>
      <p className="py-4">You can set name after create.</p>
      <div className="modal-action">
        <label
          htmlFor={createAdtionModalId}
          className="btn"
          onClick={onCreateNewAction}
        >
          Yay!
        </label>
      </div>
    </Modal>
  );
};

export default CreateActionModal;
