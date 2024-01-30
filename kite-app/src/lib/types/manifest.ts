// Code generated by tygo. DO NOT EDIT.

//////////
// source: api.go

export type APIVersion = number /* int */;
export const APIVersionAlpha: APIVersion = 0;
export type APIEncoding = number /* int */;
export const APIEncodingJSON: APIEncoding = 0;

//////////
// source: config.go

export interface ConfigSchema {
  sections: ConfigSectionSchema[];
  fields: ConfigFieldSchema[];
}
export interface ConfigSectionSchema {
  name: string;
  description: string;
  fields: ConfigFieldSchema[];
}
export type ConfigFieldType = string;
export const ConfigFieldTypeString: ConfigFieldType = "STRING";
export const ConfigFieldTypeInt: ConfigFieldType = "INT";
export const ConfigFieldTypeFloat: ConfigFieldType = "FLOAT";
export const ConfigFieldTypeBool: ConfigFieldType = "BOOL";
export interface ConfigFieldSchema {
  name: string;
  description: string;
  key: string;
  type: ConfigFieldType;
  required: boolean;
  default_value: any;
}

//////////
// source: discord.go

export interface DiscordCommand {
  type: string;
  name: string;
  description: string;
  default_member_permissions: string[];
  dm_permission: boolean;
  nsfw: boolean;
  options: DiscordCommandOptions[];
}
export interface DiscordCommandOptions {
  type: string;
  name: string;
  description: string;
  required: boolean;
  min_value: number /* int */;
  max_value: number /* int */;
  min_length: number /* int */;
  max_length: number /* int */;
  choices: DiscordCommandOptionChoice[];
  options: DiscordCommandOptions[];
}
export interface DiscordCommandOptionChoice {
  name: string;
  value: string;
}

//////////
// source: manifest.go

export interface Manifest {
  events: string[];
  discord_commands: DiscordCommand[];
  config_schema: ConfigSchema;
}
