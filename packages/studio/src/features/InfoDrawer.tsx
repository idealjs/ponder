import { useMemo } from "react";

import { useSelectedSchema, useSelectedState } from "../store";

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

  const action = useMemo(
    () =>
      selectedSchema?.actions.find((action) => {
        return action.id === transition?.actionId;
      }),
    [selectedSchema?.actions, transition?.actionId]
  );

  return (
    <div className={"p-4 w-3/5 bg-base-100 text-base-content"}>
      {selectedState?.id}
      {transition == null ? "no transition" : "transition info"}
    </div>
  );
};

export default InfoDrawer;
