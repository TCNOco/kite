package postgres

import (
	"context"
	"database/sql"

	"github.com/merlinfuchs/kite/kite-service/internal/db/postgres/pgmodel"
	"github.com/merlinfuchs/kite/kite-service/pkg/model"
	"github.com/merlinfuchs/kite/kite-service/pkg/store"
)

func (c *Client) UpsertGuild(ctx context.Context, guild model.Guild) (*model.Guild, error) {
	g, err := c.Q.UpserGuild(ctx, pgmodel.UpserGuildParams{
		ID:          guild.ID,
		Name:        guild.Name,
		Description: sql.NullString{String: guild.Description, Valid: guild.Description != ""},
		Icon:        sql.NullString{String: guild.Icon, Valid: guild.Icon != ""},
		CreatedAt:   guild.CreatedAt,
		UpdatedAt:   guild.UpdatedAt,
	})
	if err != nil {
		return nil, err
	}

	res := guildToModel(g)
	return &res, nil
}

func (c *Client) GetGuilds(ctx context.Context) ([]model.Guild, error) {
	guilds, err := c.Q.GetGuilds(ctx)
	if err != nil {
		return nil, err
	}

	result := make([]model.Guild, len(guilds))
	for i, guild := range guilds {
		result[i] = guildToModel(guild)
	}

	return result, nil
}

func (c *Client) GetGuild(ctx context.Context, id string) (*model.Guild, error) {
	guild, err := c.Q.GetGuild(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, store.ErrNotFound
		}

		return nil, err
	}

	res := guildToModel(guild)
	return &res, nil
}

func guildToModel(guild pgmodel.Guild) model.Guild {
	return model.Guild{
		ID:          guild.ID,
		Name:        guild.Name,
		Description: guild.Description.String,
		Icon:        guild.Icon.String,
		CreatedAt:   guild.CreatedAt,
		UpdatedAt:   guild.UpdatedAt,
	}
}
