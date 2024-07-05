// This file ensures reflex is treated as a tool dependency:
//go:build tools
// +build tools

package tools

import (
	_ "github.com/cespare/reflex"
)
