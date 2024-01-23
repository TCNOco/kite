// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0

package pgmodel

import (
	"database/sql"
	"encoding/json"
	"time"

	"github.com/sqlc-dev/pqtype"
)

type Deployment struct {
	ID                    string
	Key                   string
	Name                  string
	Description           string
	GuildID               string
	PluginVersionID       sql.NullString
	WasmBytes             []byte
	ManifestDefaultConfig pqtype.NullRawMessage
	ManifestEvents        []string
	ManifestCommands      []string
	Config                pqtype.NullRawMessage
	CreatedAt             time.Time
	UpdatedAt             time.Time
}

type DeploymentLog struct {
	ID           string
	DeploymentID string
	Level        string
	Message      string
	CreatedAt    time.Time
}

type Guild struct {
	ID          string
	Name        string
	Icon        sql.NullString
	Description sql.NullString
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type Plugin struct {
	ID          string
	Key         string
	Name        string
	Description string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type PluginVersion struct {
	ID                    string
	PluginID              string
	VersionMajor          int32
	VersionMinor          int32
	VersionPatch          int32
	WasmBytes             []byte
	ManifestDefaultConfig pqtype.NullRawMessage
	ManifestEvents        []string
	ManifestCommands      []string
	CreatedAt             time.Time
}

type Workspace struct {
	ID          string
	GuildID     string
	Name        string
	Description string
	Files       json.RawMessage
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
