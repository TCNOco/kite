package kite

import (
	"time"

	"github.com/merlinfuchs/kite/go-sdk/internal"
	"github.com/merlinfuchs/kite/go-types/call"
)

func Sleep(duration time.Duration) error {
	_, err := internal.MakeCall(call.Call{
		Type: call.Sleep,
		Data: call.SleepCall{
			Duration: int(duration.Milliseconds()),
		},
	})
	if err != nil {
		return err
	}
	return nil
}
