package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func (h handler) AuthMiddleware() echo.MiddlewareFunc {
	return middleware.KeyAuthWithConfig(middleware.KeyAuthConfig{
		KeyLookup: "cookie:session",
		Validator: func(key string, c echo.Context) (bool, error) {
			if isAuthed := h.session.Exists(c.Request().Context(), "user"); isAuthed {
				return true, nil
			}
			return false, nil
		},
		ErrorHandler: func(e error, c echo.Context) error {
			return echo.NewHTTPError(401, "Unauthorized")
		},
	})
}
