import { useMemo } from "react";

import CreateButton from "../components/CreateButton";
import { useSelectedSchema, useSelectedState } from "../store";
import CreateAction from "./CreateActionModal";

const InfoDrawer = () => {
  const selectedState = useSelectedState();
  const selectedSchema = useSelectedSchema();

  const transition = useMemo(
    () =>
      selectedSchema?.transitions.find((transition) => {
        return transition.startFromStateId === selectedState?.id;
      }),
    [selectedSchema?.transitions, selectedState?.id]
  );

  const currentAction = useMemo(
    () =>
      selectedSchema?.actions.find((action) => {
        return action.id === transition?.actionId;
      }),
    [selectedSchema?.actions, transition?.actionId]
  );

  return (
    <div className={"p-4 w-3/5 bg-base-100 text-base-content"}>
      <div>
        {selectedState?.name != null
          ? `state name : ${selectedState?.name}`
          : `state id : ${selectedState?.id}`}
      </div>
      <div>{transition == null ? "no transition" : "transition info"}</div>
      <div className="flex items-center">
        <select className="select select-primary w-full max-w-xs">
          {selectedSchema?.actions.map((action) => {
            return (
              <option
                value={action.id}
                selected={action.id === currentAction?.id}
              >
                {action.id}
              </option>
            );
          })}
        </select>
        <CreateButton
          className="ml-2"
          tooltip="Create Action"
          htmlFor="create-action-modal"
        />
      </div>
    </div>
  );
};

export default InfoDrawer;
