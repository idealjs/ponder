import "reactflow/dist/style.css";

import {
  useSwrManySchema,
  useSWRUpdateState,
} from "@idealjs/ponder-shared-browser";
import { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";

import {
  useSelectedStateId,
  useSetSelectedStateId,
  useStateNodes,
  useTransitionEdges,
} from "../store";
import EditorMenu from "./EditorMenu";
import InfoDrawer from "./InfoDrawer";
import StateNode from "./StateNode";

const query = {
  include: {
    states: true,
    transitions: true,
    actions: true,
  },
};

const nodeTypes = {
  stateNode: StateNode,
};

const SchemaEditor = () => {
  const stateNodes = useStateNodes();

  const transitionEdges = useTransitionEdges();
  const { trigger } = useSWRUpdateState();

  const selectedStateId = useSelectedStateId();
  const setSelectedStateId = useSetSelectedStateId();
  const { mutate } = useSwrManySchema(query);

  const [nodes, setNodes, onNodesChange] = useNodesState(stateNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(transitionEdges);

  useEffect(() => {
    setNodes(
      stateNodes.map((node) => {
        if (node.id === selectedStateId) {
          return {
            ...node,
            selected: true,
          };
        }
        return node;
      })
    );
  }, [selectedStateId, setNodes, stateNodes]);

  useEffect(() => {
    setEdges(transitionEdges);
  }, [setEdges, transitionEdges]);

  return (
    <div className="relative h-full overflow-hidden">
      <div className="drawer">
        <input id="info-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              onNodeClick={(_, node) => {
                node?.id && setSelectedStateId(node.id);
              }}
              onNodeDragStop={async (_, node) => {
                await trigger({
                  where: {
                    id: node.id,
                  },
                  data: {
                    positionX: node.position.x,
                    positionY: node.position.y,
                  },
                });
                await mutate();
              }}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </ReactFlowProvider>
          <EditorMenu className="absolute top-6 right-6" />
        </div>
        <div className="drawer-side">
          <label htmlFor="info-drawer" className="drawer-overlay"></label>
          <InfoDrawer />
        </div>
      </div>
    </div>
  );
};

export default SchemaEditor;
