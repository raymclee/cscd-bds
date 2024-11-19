package zht

type User struct {
	Name      string `json:"name,omitempty" gqlgen:"name"`
	Username  string `json:"username,omitempty" gqlgen:"username"`
	Email     string `json:"email,omitempty" gqlgen:"email"`
	OpenId    string `json:"open_id,omitempty" gqlgen:"openId"`
	AvatarUrl string `json:"avatar_url,omitempty" gqlgen:"avatarUrl"`
}
