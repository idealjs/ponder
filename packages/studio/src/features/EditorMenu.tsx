import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  useSWRCreateState,
  useSwrManySchema,
} from "@idealjs/ponder-shared-browser";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { useCallback } from "react";

import CreateButton from "../components/CreateButton";
import { useSelectedSchemaId, useSetSelectedStateId } from "../store";

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

const EditorMenu = (props: IProps) => {
  const { className } = props;
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
    <ul tabIndex={0} className={clsx("menu m-2 w-14", className)}>
      <CreateButton
        className="tooltip-left"
        onClick={onCreateNewState}
        tooltip="Create New State"
      />
    </ul>
  );
};

export default EditorMenu;
