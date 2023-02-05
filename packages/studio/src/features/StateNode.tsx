import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  useSWRCreateTransition,
  useSwrManySchema,
} from "@idealjs/ponder-shared-browser";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { Handle, Position, useNodeId, useStore } from "reactflow";

import CreateButton from "../components/CreateButton";
import { useSetSelectedStateId } from "../store";

const query = {
  include: {
    states: true,
    transitions: true,
    actions: true,
  },
};

const StateNode = () => {
  const nodeId = useNodeId();
  const setSelectedStateId = useSetSelectedStateId();
  const node = useStore((s) => {
    return nodeId == null ? null : s.nodeInternals.get(nodeId);
  });
  const { mutate } = useSwrManySchema(query);

  const { trigger } = useSWRCreateTransition();
  return (
    <div
      className={clsx(
        "bg-base-300 rounded-lg p-2 flex items-center border-solid border-2",
        {
          "border-indigo-600": node?.selected,
        }
      )}
    >
      <div className="flex items-center">
        <label
          htmlFor="info-drawer"
          className="tooltip tooltip-left drawer-button flex items-center mr-1"
          data-tip={"State Info"}
          onClick={() => {
            nodeId && setSelectedStateId(nodeId);
          }}
        >
          <div className="btn btn-circle btn-outline border-0">
            <InformationCircleIcon />
          </div>
        </label>
        <div>{node?.data.label}</div>
      </div>

      <Handle
        className="box-content"
        style={{
          right: "-6px",
          height: "12px",
          width: "12px",
          backgroundColor: "blue",
        }}
        type="target"
        position={Position.Left}
        id={node?.id}
      />

      {node?.data.transitionId == null ? (
        <CreateButton
          className="flex items-center ml-1"
          tooltip="Add Transition"
          onClick={async () => {
            await trigger({
              data: {
                id: nanoid(),
                startFromState: {
                  connect: {
                    id: node?.id,
                  },
                },
                schema: {
                  connect: {
                    id: node?.data.schemaId,
                  },
                },
              },
            });

            await mutate();
          }}
        />
      ) : (
        <div className="flex flex-col justify-around">
          <Handle
            className="box-content"
            style={{
              top: "16px",
              right: "-6px",
              height: "12px",
              width: "12px",
              backgroundColor: "green",
            }}
            type="source"
            position={Position.Right}
            id={"success_" + node.id}
          />
          <Handle
            className="box-content"
            style={{
              top: "53px",
              right: "-6px",
              height: "12px",
              width: "12px",
              backgroundColor: "red",
            }}
            type="source"
            position={Position.Right}
            id={"faild_" + node.id}
          />
        </div>
      )}
    </div>
  );
};

export default StateNode;
