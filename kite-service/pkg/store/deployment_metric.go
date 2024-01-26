package store

import (
	"context"
	"time"

	"github.com/merlinfuchs/kite/kite-service/pkg/model"
)

type DeploymentMetricStore interface {
	CreateDeploymentMetricEntry(ctx context.Context, entry model.DeploymentMetricEntry) error
	GetDeploymentEventMetrics(ctx context.Context, deploymentID string, startAt time.Time, groupBy time.Duration) ([]model.DeploymentEventMetricEntry, error)
	GetDeploymentCallMetrics(ctx context.Context, deploymentID string, startAt time.Time, groupBy time.Duration) ([]model.DeploymentCallMetricEntry, error)
}
