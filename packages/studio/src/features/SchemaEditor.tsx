import "reactflow/dist/style.css";

import { useSWRUpdateState } from "@idealjs/ponder-shared-browser";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { useStateNodes, useTransitionEdges } from "../store";

const SchemaEditor = () => {
  const stateNodes = useStateNodes();
  const transitionEdges = useTransitionEdges();
  const { trigger } = useSWRUpdateState();

  const [nodes, setNodes, onNodesChange] = useNodesState(stateNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(transitionEdges);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
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
    </div>
  );
};

export default SchemaEditor;
