import { PlusIcon } from "@heroicons/react/24/solid";
import { createSchema, useSchemaSwr } from "@idealjs/ponder-shared-browser";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { useCallback } from "react";

import { useBackendBaseURL } from "../hooks";

interface IProps {
  className?: string;
}

const CreateSchemaButton = (props: IProps) => {
  const { className } = props;
  const { mutate } = useSchemaSwr();
  const baseURL = useBackendBaseURL();
  const onClick = useCallback(async () => {
    const newSchema = {
      id: nanoid(),
    };
    mutate([
      await createSchema(
        {
          data: newSchema,
        },
        baseURL
      ),
    ]);
  }, [baseURL, mutate]);

  return (
    <div className={clsx("tooltip", className)} data-tip="Create New Schema">
      <button className="btn btn-circle btn-outline" onClick={onClick}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default CreateSchemaButton;
