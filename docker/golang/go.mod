module your_project_name

go 1.20

require (
	github.com/gofiber/fiber/v2 v2.24.0 // replace with the actual version you're using
)

replace github.com/cespare/reflex => github.com/cespare/reflex v0.3.1  // add this line to use reflex

// Add the tools import
require _ github.com/cespare/reflex v0.3.1