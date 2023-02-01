import type {
  Action,
  Schema,
  State,
  Transition,
} from "@idealjs/ponder-shared-node";
import { useCallback } from "react";
import { proxy, useSnapshot } from "valtio";
import { derive } from "valtio/utils";

const selected = proxy<Partial<{ schemaId: string; stateId: string }>>({});

const data = proxy<
  Partial<{
    schemas:
      | (Schema & {
          states: State[];
          transitions: Transition[];
          actions: Action[];
        })[]
      | null;
  }>
>({});

const drivedData = derive({
  selectedSchema: (get) => {
    const selectedSchemaId = get(selected).schemaId;
    const schemas = get(data).schemas;
    return schemas?.find((schema) => schema.id === selectedSchemaId);
  },
  selectedState: (get) => {
    const selectedSchemaId = get(selected).schemaId;
    const schemas = get(data).schemas;
    const selectedSchema = schemas?.find(
      (schema) => schema.id === selectedSchemaId
    );
    const selectedStateId = get(selected).stateId;

    return selectedSchema?.states.find((state) => state.id === selectedStateId);
  },
  stateNodes: (get) => {
    const selectedSchemaId = get(selected).schemaId;
    const schemas = get(data).schemas;
    const selectedSchema = schemas?.find(
      (schema) => schema.id === selectedSchemaId
    );

    return selectedSchema?.states.map((state) => ({
      id: state.id,
      data: { label: state.id },
      position: {
        x: state.positionX ?? 0,
        y: state.positionY ?? 0,
      },
    }));
  },
  transitionEdges: (get) => {
    const selectedSchemaId = get(selected).schemaId;
    const schemas = get(data).schemas;
    const selectedSchema = schemas?.find(
      (schema) => schema.id === selectedSchemaId
    );

    return selectedSchema?.transitions.flatMap((transition) => {
      if (
        transition.startFromStateId == null ||
        (transition.faildToStateId == null && transition.successToStateId)
      ) {
        return [];
      }

      const faildLine = {
        id: transition.startFromStateId + transition.faildToStateId,
        source: transition.startFromStateId,
        target: transition.faildToStateId,
      };

      const successLine = {
        id: transition.startFromStateId + transition.successToStateId,
        source: transition.startFromStateId,
        target: transition.successToStateId,
      };

      let lines: {
        id: string;
        source: string;
        target: string;
      }[] = [];

      if (
        transition.faildToStateId != null &&
        transition.successToStateId != null
      ) {
        lines = [faildLine, successLine] as {
          id: string;
          source: string;
          target: string;
        }[];
      }

      if (transition.faildToStateId != null) {
        lines = [faildLine] as {
          id: string;
          source: string;
          target: string;
        }[];
      }

      if (transition.successToStateId != null) {
        lines = [successLine] as {
          id: string;
          source: string;
          target: string;
        }[];
      }
      return lines;
    });
  },
});

export const useSetSchemas = () => {
  return useCallback(
    (
      schemas:
        | (Schema & {
            states: State[];
            transitions: Transition[];
            actions: Action[];
          })[]
        | null
        | undefined
    ) => {
      data.schemas = schemas;
    },
    []
  );
};

export const useSchemas = () => {
  return useSnapshot(data).schemas;
};

export const useSetSelectedSchemaId = () => {
  return useCallback((schemaId: string) => {
    selected.schemaId = schemaId;
  }, []);
};

export const useSelectedSchemaId = () => {
  return useSnapshot(selected).schemaId;
};

export const useSelectedSchema = () => {
  return useSnapshot(drivedData).selectedSchema;
};

export const useSetSelectedStateId = () => {
  return useCallback((stateId: string) => {
    selected.stateId = stateId;
  }, []);
};

export const useSelectedStateId = () => {
  return useSnapshot(selected).stateId;
};

export const useSelectedState = () => {
  return useSnapshot(drivedData).selectedState;
};

export const useStateNodes = () => {
  return useSnapshot(drivedData).stateNodes ?? [];
};

export const useTransitionEdges = () => {
  return useSnapshot(drivedData).transitionEdges ?? [];
};
