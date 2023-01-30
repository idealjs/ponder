import { PlusIcon } from "@heroicons/react/24/solid";
import {
  useSWRCreateState,
  useSwrManyState,
} from "@idealjs/ponder-shared-browser";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { useCallback } from "react";

import { useSetSelectedStateId } from "../store";

interface IProps {
  className?: string;
}

const CreateStateButton = (props: IProps) => {
  const { className } = props;

  const { trigger } = useSWRCreateState();
  const { mutate } = useSwrManyState();
  const setSelectedStateId = useSetSelectedStateId();

  const onClick = useCallback(async () => {
    const newState = {
      id: nanoid(),
    };

    await trigger({
      data: newState,
    });

    await mutate();

    setSelectedStateId(newState.id);
  }, [mutate, setSelectedStateId, trigger]);

  return (
    <div className={clsx("tooltip", className)} data-tip="Create New State">
      <button className="btn btn-circle btn-outline" onClick={onClick}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default CreateStateButton;
