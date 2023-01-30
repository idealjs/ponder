import { PlusIcon } from "@heroicons/react/24/solid";
import {
  useSWRCreateSchema,
  useSwrManySchema,
} from "@idealjs/ponder-shared-browser";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { useCallback } from "react";

import { useBackendBaseURL } from "../hooks";
import { useSetSelectedSchemaId } from "../store";

interface IProps {
  className?: string;
}

const query = {
  include: {
    states: true,
    transitions: true,
    actions: true,
  },
};

const CreateSchemaButton = (props: IProps) => {
  const { className } = props;
  const backendBaseURL = useBackendBaseURL();

  const { trigger } = useSWRCreateSchema(backendBaseURL);
  const { mutate } = useSwrManySchema(query, backendBaseURL);
  const setSelectedSchemaId = useSetSelectedSchemaId();

  const onClick = useCallback(async () => {
    const newSchema = {
      id: nanoid(),
    };

    await trigger({
      ...query,
      data: newSchema,
    });

    await mutate();

    setSelectedSchemaId(newSchema.id);
  }, [mutate, setSelectedSchemaId, trigger]);

  return (
    <div className={clsx("tooltip", className)} data-tip="Create New Schema">
      <button className="btn btn-circle btn-outline" onClick={onClick}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default CreateSchemaButton;
