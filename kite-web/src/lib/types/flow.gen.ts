// Code generated by tygo. DO NOT EDIT.
type StringIndexable = Record<string, unknown>;

//////////
// source: data.go

export interface FlowData {
  nodes: FlowNode[];
  edges: FlowEdge[];
}
export type FlowNodeType = string;
export const FlowNodeTypeEntryCommand: FlowNodeType = "entry_command";
export const FlowNodeTypeEntryEvent: FlowNodeType = "entry_event";
export const FlowNodeTypeOptionCommandArgument: FlowNodeType = "option_command_argument";
export const FlowNodeTypeOptionCommandPermissions: FlowNodeType = "option_command_permissions";
export const FlowNodeTypeOptionCommandContexts: FlowNodeType = "option_command_contexts";
export const FlowNodeTypeOptionEventFilter: FlowNodeType = "option_event_filter";
export const FlowNodeTypeActionResponseCreate: FlowNodeType = "action_response_create";
export const FlowNodeTypeActionResponseEdit: FlowNodeType = "action_response_edit";
export const FlowNodeTypeActionResponseDelete: FlowNodeType = "action_response_delete";
export const FlowNodeTypeActionMessageCreate: FlowNodeType = "action_message_create";
export const FlowNodeTypeActionMessageEdit: FlowNodeType = "action_message_edit";
export const FlowNodeTypeActionMessageDelete: FlowNodeType = "action_message_delete";
export const FlowNodeTypeActionMemberBan: FlowNodeType = "action_member_ban";
export const FlowNodeTypeActionMemberKick: FlowNodeType = "action_member_kick";
export const FlowNodeTypeActionMemberTimeout: FlowNodeType = "action_member_timeout";
export const FlowNodeTypeActionChannelCreate: FlowNodeType = "action_channel_create";
export const FlowNodeTypeActionChannelEdit: FlowNodeType = "action_channel_edit";
export const FlowNodeTypeActionChannelDelete: FlowNodeType = "action_channel_delete";
export const FlowNodeTypeActionThreadCreate: FlowNodeType = "action_thread_create";
export const FlowNodeTypeActionRoleCreate: FlowNodeType = "action_role_create";
export const FlowNodeTypeActionRoleEdit: FlowNodeType = "action_role_edit";
export const FlowNodeTypeActionRoleDelete: FlowNodeType = "action_role_delete";
export const FlowNodeTypeActionVariableSet: FlowNodeType = "action_variable_set";
export const FlowNodeTypeActionVariableDelete: FlowNodeType = "action_variable_delete";
export const FlowNodeTypeActionHTTPRequest: FlowNodeType = "action_http_request";
export const FlowNodeTypeActionLog: FlowNodeType = "action_log";
export const FlowNodeTypeControlConditionCompare: FlowNodeType = "control_condition_compare";
export const FlowNodeTypeControlConditionItemCompare: FlowNodeType = "control_condition_item_compare";
export const FlowNodeTypeControlConditionUser: FlowNodeType = "control_condition_user";
export const FlowNodeTypeControlConditionItemUser: FlowNodeType = "control_condition_item_user";
export const FlowNodeTypeControlConditionChannel: FlowNodeType = "control_condition_channel";
export const FlowNodeTypeControlConditionItemChannel: FlowNodeType = "control_condition_item_channel";
export const FlowNodeTypeControlConditionRole: FlowNodeType = "control_condition_role";
export const FlowNodeTypeControlConditionItemRole: FlowNodeType = "control_condition_item_role";
export const FlowNodeTypeControlConditionItemElse: FlowNodeType = "control_condition_item_else";
export const FlowNodeTypeControlLoop: FlowNodeType = "control_loop";
export const FlowNodeTypeControlLoopEach: FlowNodeType = "control_loop_each";
export const FlowNodeTypeControlLoopEnd: FlowNodeType = "control_loop_end";
export const FlowNodeTypeControlLoopExit: FlowNodeType = "control_loop_exit";
export interface FlowNode {
  id: string;
  type?: FlowNodeType;
  data: FlowNodeData & StringIndexable;
  position: FlowNodePosition;
}
export interface FlowNodeData {
  /**
   * Shared
   */
  name?: string;
  description?: string;
  custom_label?: string;
  result_variable_name?: string;
  audit_log_reason?: string;
  /**
   * Command Argument
   */
  command_argument_type?: CommandArgumentType;
  command_argument_required?: boolean;
  /**
   * Command Permissions
   */
  command_permissions?: string;
  /**
   * Command Contexts
   */
  command_disabled_contexts?: CommandContextType[];
  /**
   * Message & Response Create, edit, Delete
   */
  message_target?: string;
  message_data?: any /* api.SendMessageData */;
  message_template_id?: string;
  message_ephemeral?: boolean;
  /**
   * Member Ban, Kick, Timeout
   */
  member_target?: string;
  member_ban_delete_message_duration?: string;
  member_timeout_duration?: string;
  /**
   * Channel Create, Edit, Delete
   */
  channel_target?: string;
  channel_data?: any /* api.CreateChannelData */;
  /**
   * Role Create, Edit, Delete
   */
  role_target?: string;
  role_data?: any /* api.CreateRoleData */;
  /**
   * Variable Set, Delete
   */
  variable_name?: string;
  variable_value?: FlowValue;
  /**
   * HTTP Request
   */
  http_request_data?: HTTPRequestData;
  /**
   * Event Entry
   */
  event_type?: string;
  /**
   * Event Filter
   */
  event_filter_target?: EventFilterTarget;
  event_filter_expression?: string;
  /**
   * Log
   */
  log_level?: LogLevel;
  log_message?: string;
  /**
   * Condition
   */
  condition_base_value?: FlowValue;
  condition_allow_multiple?: boolean;
  condition_item_mode?: ConditionItemType;
  condition_item_value?: FlowValue;
  /**
   * Loop
   */
  loop_count?: string;
}
export type LogLevel = string;
export const LogLevelDebug: LogLevel = "debug";
export const LogLevelInfo: LogLevel = "info";
export const LogLevelWarn: LogLevel = "warn";
export const LogLevelError: LogLevel = "error";
export type ConditionItemType = string;
export const ConditionItemModeEqual: ConditionItemType = "equal";
export const ConditionItemModeNotEqual: ConditionItemType = "not_equal";
export const ConditionItemModeGreaterThan: ConditionItemType = "greater_than";
export const ConditionItemModeGreaterThanOrEqual: ConditionItemType = "greater_than_or_equal";
export const ConditionItemModeLessThan: ConditionItemType = "less_than";
export const ConditionItemModeLessThanOrEqual: ConditionItemType = "less_than_or_equal";
export const ConditionItemModeContains: ConditionItemType = "contains";
export type CommandArgumentType = string;
export const CommandArgumentTypeString: CommandArgumentType = "string";
export const CommandArgumentTypeInteger: CommandArgumentType = "integer";
export const CommandArgumentTypeBoolean: CommandArgumentType = "boolean";
export const CommandArgumentTypeUser: CommandArgumentType = "user";
export const CommandArgumentTypeRole: CommandArgumentType = "role";
export const CommandArgumentTypeChannel: CommandArgumentType = "channel";
export const CommandArgumentTypeMentionable: CommandArgumentType = "mentionable";
export const CommandArgumentTypeNumber: CommandArgumentType = "number";
export const CommandArgumentTypeAttachment: CommandArgumentType = "attachment";
export type CommandContextType = string;
export const CommandContextTypeGuild: CommandContextType = "guild";
export const CommandContextTypeBotDM: CommandContextType = "bot_dm";
export const CommandContextTypePrivateChannel: CommandContextType = "private_channel";
export type EventFilterTarget = string;
export const EventFilterTypeMessageContent: EventFilterTarget = "message_content";
export interface HTTPRequestData {
  url?: string;
  method?: string;
}
export interface FlowNodePosition {
  x: number /* float64 */;
  y: number /* float64 */;
}
export interface FlowEdge {
  id: string;
  type?: string;
  source: string;
  target: string;
}

//////////
// source: provider_mock.go

export interface MockDiscordProvider {
}
export interface MockLogProvider {
}
export interface MockHTTPprovider {
}

//////////
// source: value.go

export type FlowValueType = string;
export const FlowValueTypeNull: FlowValueType = "null";
export const FlowValueTypeString: FlowValueType = "string";
export const FlowValueTypeNumber: FlowValueType = "number";
export const FlowValueTypeArray: FlowValueType = "array";
export const FlowValueTypeMessage: FlowValueType = "message";
export interface FlowValue {
  type: FlowValueType;
  value: any;
}

//////////
// source: variable.go

export interface FlowContextVariables {
  TemplateContext?: any /* template.TemplateContext */;
  Variables: { [key: string]: FlowValue};
}
