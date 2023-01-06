import { EdgeData, NodeData } from "reaflow";
import { proxy, useSnapshot } from "valtio";

import { INodeData } from "../types";

const nodesProxy = proxy<NodeData<INodeData>[]>([
  {
    id: "1",
    text: "1",
    data: {},
  },
  {
    id: "2",
    text: "2",
  },
  {
    id: "3",
    text: "3",
  },
  {
    id: "4",
    text: "4",
  },
  {
    id: "5",
    text: "5",
  },
  {
    id: "6",
    text: "6",
  },
  {
    id: "7",
    text: "7",
  },
  {
    id: "8",
    text: "8",
  },
  {
    id: "9",
    text: "9",
  },
  {
    id: "10",
    text: "10",
  },
  {
    id: "11",
    text: "11",
  },
  {
    id: "12",
    text: "12",
  },
  {
    id: "13",
    text: "13",
  },
  {
    id: "14",
    text: "14",
  },
  {
    id: "15",
    text: "15",
  },
  {
    id: "16",
    text: "16",
  },
  {
    id: "17",
    text: "17",
  },
  {
    id: "18",
    text: "18",
  },
  {
    id: "19",
    text: "19",
  },
  {
    id: "20",
    text: "20",
  },
  {
    id: "21",
    text: "21",
  },
  {
    id: "22",
    text: "22",
  },
  {
    id: "23",
    text: "23",
  },
  {
    id: "24",
    text: "24",
  },
  {
    id: "25",
    text: "25",
  },
  {
    id: "26",
    text: "26",
  },
  {
    id: "27",
    text: "27",
  },
  {
    id: "28",
    text: "28",
  },
  {
    id: "29",
    text: "29",
  },
  {
    id: "30",
    text: "30",
  },
]);

export const useNodes = () => {
  return useSnapshot(nodesProxy);
};

const edgesProxy = proxy<EdgeData[]>([
  {
    id: "1-2",
    from: "1",
    to: "2",
  },
  {
    id: "1-3",
    from: "1",
    to: "3",
  },
  {
    id: "1-4",
    from: "1",
    to: "4",
  },
  {
    id: "1-5",
    from: "1",
    to: "5",
  },
  {
    id: "1-6",
    from: "1",
    to: "6",
  },
  {
    id: "1-7",
    from: "1",
    to: "7",
  },
  {
    id: "2-8",
    from: "2",
    to: "8",
  },
  {
    id: "2-9",
    from: "2",
    to: "9",
  },
  {
    id: "2-10",
    from: "2",
    to: "10",
  },
  {
    id: "2-11",
    from: "2",
    to: "11",
  },
  {
    id: "2-12",
    from: "2",
    to: "12",
  },
  {
    id: "2-13",
    from: "2",
    to: "13",
  },
  {
    id: "3-14",
    from: "3",
    to: "14",
  },
  {
    id: "3-15",
    from: "3",
    to: "15",
  },
  {
    id: "3-16",
    from: "3",
    to: "16",
  },
  {
    id: "3-17",
    from: "3",
    to: "17",
  },
  {
    id: "3-18",
    from: "3",
    to: "18",
  },
  {
    id: "3-19",
    from: "3",
    to: "19",
  },
  {
    id: "3-20",
    from: "3",
    to: "20",
  },
  {
    id: "10-21",
    from: "10",
    to: "21",
  },
  {
    id: "10-22",
    from: "10",
    to: "22",
  },
  {
    id: "10-23",
    from: "10",
    to: "23",
  },
  {
    id: "10-24",
    from: "10",
    to: "24",
  },
  {
    id: "10-25",
    from: "10",
    to: "25",
  },
  {
    id: "17-26",
    from: "17",
    to: "26",
  },
  {
    id: "17-27",
    from: "17",
    to: "27",
  },
  {
    id: "17-28",
    from: "17",
    to: "28",
  },
  {
    id: "17-29",
    from: "17",
    to: "29",
  },
  {
    id: "17-30",
    from: "17",
    to: "30",
  },
]);

export const useEdges = () => {
  return useSnapshot(edgesProxy);
};

const selectedProxy = proxy<{ node?: NodeData<INodeData> }>({});

export const useSelected = () => {
  return useSnapshot(selectedProxy);
};

export const setSelectedNode = (node: NodeData<INodeData>) => {
  selectedProxy.node = node;
};
