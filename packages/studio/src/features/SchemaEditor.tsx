import "reactflow/dist/style.css";

import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { useStateNodes, useTransitionEdges } from "../store";
import trpc from "../trpc";

const SchemaEditor = () => {
  const stateNodes = useStateNodes();
  const transitionEdges = useTransitionEdges();

  const [nodes, setNodes, onNodesChange] = useNodesState(stateNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(transitionEdges);

  const { mutate } = trpc.state.updateOneState.useMutation();

  return (
    <div style={{ height: "100%" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={(_, node) => {
            mutate({
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
