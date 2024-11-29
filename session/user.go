package session

import "time"

type User struct {
	AccessToken  string    `json:"access_token"`
	ExpiresIn    time.Time `json:"expires_in"` // 过期时间，单位秒
	RefreshToken string    `json:"refresh_token"`
	Name         string    `json:"name,omitempty"`           // 用户姓名
	Username     string    `json:"en_name,omitempty"`        // 用户英文名称
	AvatarUrl    string    `json:"avatar_url,omitempty"`     // 用户头像
	AvatarThumb  string    `json:"avatar_thumb,omitempty"`   // 用户头像 72x72
	AvatarMiddle string    `json:"avatar_middle,omitempty"`  // 用户头像 240x240
	AvatarBig    string    `json:"avatar_big,omitempty"`     // 用户头像 640x640
	OpenId       string    `json:"open_id,omitempty"`        // 用户在应用内的唯一标识
	UnionId      string    `json:"union_id,omitempty"`       // 用户统一ID
	Email        string    `json:"email,omitempty"`          // 用户邮箱
	UserId       string    `json:"user_id,omitempty"`        // 用户 user_id
	IsAdmin      bool      `json:"is_admin,omitempty"`       // 是否是管理员
	IsEditor     bool      `json:"is_editor,omitempty"`      // 是否是编辑
	HasMapAccess bool      `json:"has_map_access,omitempty"` // 是否拥有地图访问权限
}

func (u User) IsExpired() bool {
	return u.ExpiresIn.Before(time.Now())
}

// func (u User) IsAdmin() bool {
// 	return u.AdminId != ""
// }
