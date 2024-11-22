package handler

import (
	"cscd-bds/session"

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

func (h handler) AdminOnly() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if isAdmin := h.session.Get(c.Request().Context(), "user").(session.User).IsAdmin; isAdmin {
				return next(c)
			}
			return echo.NewHTTPError(403, "Forbidden")
		}
	}
}
