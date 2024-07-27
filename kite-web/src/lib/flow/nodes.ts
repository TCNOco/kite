import { ExoticComponent, useMemo } from "react";
import {
  nodeActionLogDataSchema,
  nodeActionMessageCreateDataSchema,
  nodeActionResponseCreateDataSchema,
  nodeConditionCompareDataSchema,
  nodeConditionItemCompareDataSchema,
  NodeData,
  nodeEntryCommandDataSchema,
  nodeEntryEventDataSchema,
  nodeOptionDataSchema,
} from "./data";
import { ZodSchema } from "zod";
import { Edge, Node, XYPosition } from "@xyflow/react";
import { getUniqueId } from "../utils";
import {
  ArrowLeftRightIcon,
  CircleHelpIcon,
  FileIcon,
  HashIcon,
  MessageCirclePlusIcon,
  MessageCircleReply,
  PlusIcon,
  SatelliteDishIcon,
  ScrollTextIcon,
  ShieldCheckIcon,
  SlashSquareIcon,
  TagIcon,
  TextIcon,
  UserIcon,
  XCircleIcon,
} from "lucide-react";

export const primaryColor = "#3B82F6";

export const actionColor = "#3b82f6";
export const entryColor = "#eab308";
export const errorColor = "#ef4444";
export const conditionColor = "#22c55e";
export const optionColor = "#a855f7";

export interface NodeValues {
  color: string;
  icon: ExoticComponent<{ className: string }>;
  defaultTitle: string;
  defaultDescription: string;
  dataSchema?: ZodSchema;
  dataFields: string[];
  ownsChildren?: boolean;
  fixed?: boolean;
}

export const nodeTypes: Record<string, NodeValues> = {
  entry_command: {
    color: entryColor,
    icon: SlashSquareIcon,
    defaultTitle: "Command",
    defaultDescription:
      "Command entry. Drop different actions and options here!",
    dataSchema: nodeEntryCommandDataSchema,
    dataFields: ["name", "description"],
    fixed: true,
  },
  entry_event: {
    color: entryColor,
    icon: SatelliteDishIcon,
    defaultTitle: "Listen for Event",
    defaultDescription:
      "Listens for an event to trigger the flow. Drop different actions and options here!",
    dataSchema: nodeEntryEventDataSchema,
    dataFields: ["event_type"],
    fixed: true,
  },
  action_response_create: {
    color: actionColor,
    icon: MessageCircleReply,
    defaultTitle: "Create response message",
    defaultDescription: "Bot replies to the interaction with a message",
    dataSchema: nodeActionResponseCreateDataSchema,
    dataFields: ["message_data", "message_ephemeral", "custom_label"],
  },
  action_message_create: {
    color: actionColor,
    icon: MessageCirclePlusIcon,
    defaultTitle: "Create channel message",
    defaultDescription: "Bot sends a message to a channel",
    dataSchema: nodeActionMessageCreateDataSchema,
    dataFields: ["message_data", "result_variable_name", "custom_label"],
  },
  action_log: {
    color: actionColor,
    icon: ScrollTextIcon,
    defaultTitle: "Log Message",
    defaultDescription:
      "Log some text which is only visible in the deployment logs",
    dataSchema: nodeActionLogDataSchema,
    dataFields: ["log_level", "log_message", "custom_label"],
  },
  condition_compare: {
    color: conditionColor,
    icon: ArrowLeftRightIcon,
    defaultTitle: "Comparison Condition",
    defaultDescription:
      "Run actions based on the difference between two values.",
    dataSchema: nodeConditionCompareDataSchema,
    dataFields: [
      "condition_base_value",
      "condition_allow_multiple",
      "custom_label",
    ],
    ownsChildren: true,
  },
  condition_item_compare: {
    color: conditionColor,
    icon: CircleHelpIcon,
    defaultTitle: "Equal Condition",
    dataSchema: nodeConditionItemCompareDataSchema,
    defaultDescription: "Run actions if the two values are equal.",
    dataFields: ["condition_item_mode", "condition_item_value"],
  },
  condition_permissions: {
    color: conditionColor,
    icon: ShieldCheckIcon,
    defaultTitle: "Permissions Condition",
    defaultDescription: "Run actions based on the permissions of a user.",
    dataSchema: nodeConditionCompareDataSchema,
    dataFields: ["custom_label"],
    ownsChildren: true,
  },
  condition_item_permissions: {
    color: conditionColor,
    icon: CircleHelpIcon,
    defaultTitle: "Has Permissions",
    dataSchema: nodeConditionItemCompareDataSchema,
    defaultDescription:
      "Run actions if the user has the specified permissions.",
    dataFields: [],
  },
  condition_item_else: {
    color: errorColor,
    icon: XCircleIcon,
    defaultTitle: "Else",
    defaultDescription: "Run actions if no other conditions are met.",
    dataFields: [],
    fixed: true,
  },
  option_command_text: {
    color: optionColor,
    icon: TextIcon,
    defaultTitle: "Text",
    defaultDescription: "Type in some plain text",
    dataSchema: nodeOptionDataSchema,
    dataFields: ["name", "description", "custom_label"],
  },
  option_command_number: {
    color: optionColor,
    icon: PlusIcon,
    defaultTitle: "Number",
    defaultDescription: "Type in a number",
    dataSchema: nodeOptionDataSchema,
    dataFields: ["name", "description", "custom_label"],
  },
  option_command_user: {
    color: optionColor,
    icon: UserIcon,
    defaultTitle: "User",
    defaultDescription: "Select a member from the server",
    dataSchema: nodeOptionDataSchema,
    dataFields: ["name", "description", "custom_label"],
  },
  option_command_channel: {
    color: optionColor,
    icon: HashIcon,
    defaultTitle: "Channel",
    defaultDescription: "Select a channel from the server",
    dataSchema: nodeOptionDataSchema,
    dataFields: ["name", "description", "custom_label"],
  },
  option_command_role: {
    color: optionColor,
    icon: TagIcon,
    defaultTitle: "Role",
    defaultDescription: "Select a role from the server",
    dataSchema: nodeOptionDataSchema,
    dataFields: ["name", "description", "custom_label"],
  },
  option_command_attachment: {
    color: optionColor,
    icon: FileIcon,
    defaultTitle: "Attachment",
    defaultDescription: "Upload a file",
    dataSchema: nodeOptionDataSchema,
    dataFields: ["name", "description", "custom_label"],
  },
};

const unknownNodeType: NodeValues = {
  color: "#ff0000",
  icon: CircleHelpIcon,
  defaultTitle: "Unknown",
  defaultDescription: "Unknown node type.",
  dataFields: [],
};

export function getNodeValues(nodeType: string): NodeValues {
  const values = nodeTypes[nodeType];
  if (!values) {
    return unknownNodeType;
  }
  return values;
}

export function useNodeValues(nodeType: string): NodeValues {
  return useMemo(() => getNodeValues(nodeType), [nodeType]);
}

export function createNode(
  type: string,
  position: XYPosition,
  props?: Partial<Node<NodeData>>
): [Node<NodeData>[], Edge[]] {
  // TODO: some nodes may need some default children
  const id = getUniqueId().toString();

  const nodes: Node<NodeData>[] = [
    {
      id,
      type,
      position,
      data: {},
      ...props,
    },
  ];
  const edges: Edge[] = [];

  if (type === "condition_compare") {
    const [elseNodes, elseEdges] = createNode("condition_item_else", {
      x: position.x + 200,
      y: position.y + 200,
    });

    nodes.push(...elseNodes);
    edges.push({
      id: getUniqueId().toString(),
      source: id,
      target: elseNodes[0].id,
      type: "fixed",
    });
    edges.push(...elseEdges);

    const [compareNodes, compareEdges] = createNode("condition_item_compare", {
      x: position.x - 150,
      y: position.y + 200,
    });

    nodes.push(...compareNodes);
    edges.push({
      id: getUniqueId().toString(),
      source: id,
      target: compareNodes[0].id,
      type: "fixed",
    });
    edges.push(...compareEdges);
  } else if (type === "condition_permissions") {
    const [elseNodes, elseEdges] = createNode("condition_item_else", {
      x: position.x + 200,
      y: position.y + 200,
    });

    nodes.push(...elseNodes);
    edges.push({
      id: getUniqueId().toString(),
      source: id,
      target: elseNodes[0].id,
      type: "fixed",
    });
    edges.push(...elseEdges);

    const [compareNodes, compareEdges] = createNode(
      "condition_item_permissions",
      {
        x: position.x - 150,
        y: position.y + 200,
      }
    );

    nodes.push(...compareNodes);
    edges.push({
      id: getUniqueId().toString(),
      source: id,
      target: compareNodes[0].id,
      type: "fixed",
    });
    edges.push(...compareEdges);
  }

  return [nodes, edges];
}
