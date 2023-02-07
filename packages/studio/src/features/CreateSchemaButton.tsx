import {
  useSWRCreateSchema,
  useSwrManySchema,
} from "@idealjs/ponder-shared-browser";
import { nanoid } from "nanoid";
import { useCallback } from "react";

import CreateButton from "../components/CreateButton";
import { useSetSelectedSchemaId } from "../store";
import schemaQuery from "./schemaQuery";

interface IProps {
  className?: string;
}

const CreateSchemaButton = (props: IProps) => {
  const { className } = props;

  const { trigger } = useSWRCreateSchema();
  const { mutate } = useSwrManySchema(schemaQuery);
  const setSelectedSchemaId = useSetSelectedSchemaId();

  const onClick = useCallback(async () => {
    const newSchema = {
      id: nanoid(),
    };

    await trigger({
      ...schemaQuery,
      data: newSchema,
    });

    await mutate();

    setSelectedSchemaId(newSchema.id);
  }, [mutate, setSelectedSchemaId, trigger]);

  return (
    <CreateButton
      className={className}
      onClick={onClick}
      tooltip="Create New Schema"
    />
  );
};

export default CreateSchemaButton;
