package handler

import (
	"cscd-bds/session"
	"cscd-bds/store/ent/schema/xid"

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
			sess, ok := h.session.Get(c.Request().Context(), "user").(session.User)
			if !ok {
				return echo.NewHTTPError(401, "Unauthorized")
			}
			u, err := h.store.User.Get(c.Request().Context(), xid.ID(sess.UserId))
			if err != nil {
				return echo.NewHTTPError(500, "Internal Server Error")
			}
			if u.IsAdmin {
				return next(c)
			}

			return echo.NewHTTPError(403, "Forbidden")
		}
	}
}
