import "reactflow/dist/style.css";

import { useSWRUpdateState } from "@idealjs/ponder-shared-browser";
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

const SchemaEditor = () => {
  const stateNodes = useStateNodes();
  const transitionEdges = useTransitionEdges();
  const { trigger } = useSWRUpdateState();
  const setSelectedStateId = useSetSelectedStateId();
  const selectedStateId = useSelectedStateId();

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

  return (
    <div className="relative h-full overflow-hidden">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => {
            setSelectedStateId(node.id);
          }}
          onNodeDragStop={(_, node) => {
            trigger({
              where: {
                id: node.id,
              },
              data: {
                positionX: node.position.x,
                positionY: node.position.y,
              },
            });
          }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
      <EditorMenu className="absolute top-6 right-6" />
    </div>
  );
};

export default SchemaEditor;
