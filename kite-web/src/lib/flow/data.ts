import { Edge, Node, NodeProps as XYNodeProps } from "@xyflow/react";
import z from "zod";

export interface FlowData {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

export interface NodeData extends Record<string, unknown> {
  custom_label?: string;
  name?: string;
  description?: string;
  event_type?: string;
  message_data?: any;
  message_ephemeral?: boolean;
  log_level?: string;
  log_message?: string;

  condition_base_value?: string;
  condition_allow_multiple?: boolean;
  condition_item_mode?: string;
  condition_item_value?: string;

  result_variable_name?: string;
}

export type NodeProps = XYNodeProps<Node<NodeData>>;

export type NodeType = Node<NodeData>;

export const nodeBaseDataSchema = z.object({
  custom_label: z.string().optional(),
});

export const nodeOptionDataSchema = nodeBaseDataSchema.extend({
  name: z.string().max(100).min(3),
  description: z.string().max(100).min(3),
});

export const nodeEntryCommandDataSchema = nodeBaseDataSchema.extend({
  name: z.string().max(100).min(3),
  description: z.string().max(100).min(3),
});

export const nodeEntryEventDataSchema = nodeBaseDataSchema.extend({
  event_type: z.string(),
});

export const nodeActionResponseCreateDataSchema = nodeBaseDataSchema.extend({
  message_data: z.object({
    content: z.string().max(2000).min(1),
  }),
});

export const nodeActionMessageCreateDataSchema = nodeBaseDataSchema.extend({
  message_data: z.object({
    content: z.string().max(2000).min(1),
  }),
  result_variable_name: z.string().optional(),
});

export const nodeActionLogDataSchema = nodeBaseDataSchema.extend({
  log_level: z
    .literal("debug")
    .or(z.literal("info"))
    .or(z.literal("warn"))
    .or(z.literal("error")),
  log_message: z.string().max(2000).min(1),
});

export const nodeConditionCompareDataSchema = nodeBaseDataSchema.extend({
  condition_base_value: z.string(),
  condition_allow_multiple: z.boolean().optional(),
});

export const nodeConditionItemCompareDataSchema = nodeBaseDataSchema.extend({
  condition_item_value: z.string(),
  condition_item_mode: z
    .literal("equal")
    .or(z.literal("not_equal"))
    .or(z.literal("greater_than"))
    .or(z.literal("less_than"))
    .or(z.literal("greater_than_or_equal"))
    .or(z.literal("less_than_or_equal"))
    .or(z.literal("contains")),
});
