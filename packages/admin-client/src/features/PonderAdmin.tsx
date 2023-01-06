import {
  Arrow,
  Canvas,
  detectCircular,
  Edge,
  EdgeData,
  hasLink,
  Label,
  Node,
  NodeData,
  Port,
  Remove,
} from "reaflow";
import { proxy, useSnapshot } from "valtio";

import { useEdges, useNodes } from "../store";
import { INodeData } from "../types";

const PonderAdmin2 = () => {
  const nodes = useNodes();
  const edges = useEdges();

  return (
    <Canvas
      nodes={nodes}
      edges={edges}
      onMouseEnter={() => undefined}
      onMouseLeave={() => undefined}
      onCanvasClick={() => undefined}
      dragNode={null}
      dragEdge={null}
      arrow={<Arrow />}
      node={
        <Node
          onClick={(event, node: NodeData<INodeData>) => {
            if (node.data) {
              console.log(node);
            }
          }}
          dragType="node"
          remove={<Remove />}
          port={<Port />}
          label={<Label />}
        />
      }
      edge={<Edge />}
      onLayoutChange={(layout) => console.log("Layout", layout)}
      onNodeLinkCheck={(_event, from: NodeData, to: NodeData) => {
        if (from.id === to.id) {
          return false;
        }

        if (hasLink(edges, to, from)) {
          return false;
        }

        if (detectCircular(nodes, edges, to, from)) {
          return false;
        }

        return true;
      }}
    />
  );
};

export default PonderAdmin2;
