// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: kv_storage.sql

package pgmodel

import (
	"context"
	"encoding/json"
	"time"
)

const deleteKVStorageKey = `-- name: DeleteKVStorageKey :one
DELETE FROM kv_storage WHERE guild_id = $1 AND namespace = $2 AND key = $3 RETURNING guild_id, namespace, key, value, created_at, updated_at
`

type DeleteKVStorageKeyParams struct {
	GuildID   string
	Namespace string
	Key       string
}

func (q *Queries) DeleteKVStorageKey(ctx context.Context, arg DeleteKVStorageKeyParams) (KvStorage, error) {
	row := q.db.QueryRowContext(ctx, deleteKVStorageKey, arg.GuildID, arg.Namespace, arg.Key)
	var i KvStorage
	err := row.Scan(
		&i.GuildID,
		&i.Namespace,
		&i.Key,
		&i.Value,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getKVStorageKey = `-- name: GetKVStorageKey :one
SELECT guild_id, namespace, key, value, created_at, updated_at FROM kv_storage WHERE guild_id = $1 AND namespace = $2 AND key = $3
`

type GetKVStorageKeyParams struct {
	GuildID   string
	Namespace string
	Key       string
}

func (q *Queries) GetKVStorageKey(ctx context.Context, arg GetKVStorageKeyParams) (KvStorage, error) {
	row := q.db.QueryRowContext(ctx, getKVStorageKey, arg.GuildID, arg.Namespace, arg.Key)
	var i KvStorage
	err := row.Scan(
		&i.GuildID,
		&i.Namespace,
		&i.Key,
		&i.Value,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getKVStorageKeys = `-- name: GetKVStorageKeys :many
SELECT guild_id, namespace, key, value, created_at, updated_at FROM kv_storage WHERE guild_id = $1 AND namespace = $2
`

type GetKVStorageKeysParams struct {
	GuildID   string
	Namespace string
}

func (q *Queries) GetKVStorageKeys(ctx context.Context, arg GetKVStorageKeysParams) ([]KvStorage, error) {
	rows, err := q.db.QueryContext(ctx, getKVStorageKeys, arg.GuildID, arg.Namespace)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []KvStorage
	for rows.Next() {
		var i KvStorage
		if err := rows.Scan(
			&i.GuildID,
			&i.Namespace,
			&i.Key,
			&i.Value,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getKVStorageNamespaces = `-- name: GetKVStorageNamespaces :many
SELECT  namespace, COUNT(key) as key_count FROM kv_storage WHERE guild_id = $1 GROUP BY namespace
`

type GetKVStorageNamespacesRow struct {
	Namespace string
	KeyCount  int64
}

func (q *Queries) GetKVStorageNamespaces(ctx context.Context, guildID string) ([]GetKVStorageNamespacesRow, error) {
	rows, err := q.db.QueryContext(ctx, getKVStorageNamespaces, guildID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetKVStorageNamespacesRow
	for rows.Next() {
		var i GetKVStorageNamespacesRow
		if err := rows.Scan(&i.Namespace, &i.KeyCount); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const setKVStorageKey = `-- name: SetKVStorageKey :one
INSERT INTO kv_storage (
    guild_id, 
    namespace, 
    key, 
    value, 
    created_at, 
    updated_at
) VALUES (
    $1, 
    $2, 
    $3, 
    $4, 
    $5, 
    $6
) ON CONFLICT (guild_id, namespace, key) DO UPDATE SET 
    value = $4, 
    updated_at = $6
RETURNING guild_id, namespace, key, value, created_at, updated_at
`

type SetKVStorageKeyParams struct {
	GuildID   string
	Namespace string
	Key       string
	Value     json.RawMessage
	CreatedAt time.Time
	UpdatedAt time.Time
}

func (q *Queries) SetKVStorageKey(ctx context.Context, arg SetKVStorageKeyParams) (KvStorage, error) {
	row := q.db.QueryRowContext(ctx, setKVStorageKey,
		arg.GuildID,
		arg.Namespace,
		arg.Key,
		arg.Value,
		arg.CreatedAt,
		arg.UpdatedAt,
	)
	var i KvStorage
	err := row.Scan(
		&i.GuildID,
		&i.Namespace,
		&i.Key,
		&i.Value,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}
