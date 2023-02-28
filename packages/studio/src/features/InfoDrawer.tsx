import {
  useSwrManySchema,
  useSWRUpdateTransition,
} from "@idealjs/ponder-shared-browser";
import { useMemo } from "react";

import CreateButton from "../components/CreateButton";
import {
  useSelectedSchema,
  useSelectedState,
  useSelectedTransition,
} from "../store";
import { createAdtionModalId } from "./CreateActionModal";
import schemaQuery from "./schemaQuery";

const InfoDrawer = () => {
  const selectedState = useSelectedState();
  const selectedSchema = useSelectedSchema();
  const selectedTransition = useSelectedTransition();

  const currentAction = useMemo(
    () =>
      selectedSchema?.actions.find((action) => {
        return action.id === selectedTransition?.actionId;
      }),
    [selectedSchema?.actions, selectedTransition?.actionId]
  );

  const { trigger } = useSWRUpdateTransition();
  const { mutate } = useSwrManySchema(schemaQuery);

  return (
    <div className={"p-4 w-3/5 bg-base-100 text-base-content"}>
      <div>
        {selectedState?.name != null
          ? `state name : ${selectedState?.name}`
          : `state id : ${selectedState?.id}`}
      </div>
      <div>
        {selectedTransition == null ? "no transition" : "transition info"}
      </div>

      <div>actions</div>
      <div className="flex items-center">
        <select
          className="select select-primary w-full max-w-xs"
          value={currentAction?.id ?? "empty"}
          onChange={async (event) => {
            if (selectedTransition?.id != null) {
              await trigger({
                where: {
                  id: selectedTransition?.id,
                },
                data: {
                  actionId: event.target.value,
                },
              });
              await mutate();
            }
          }}
        >
          <option value="empty" disabled={true}>
            -- select an option --
          </option>
          {selectedSchema?.actions.map((action) => {
            return (
              <option key={action.id} value={action.id}>
                {action.id}
              </option>
            );
          })}
        </select>
        <CreateButton
          className="ml-2"
          tooltip="Create Action"
          htmlFor={createAdtionModalId}
        />
      </div>
    </div>
  );
};

export default InfoDrawer;
