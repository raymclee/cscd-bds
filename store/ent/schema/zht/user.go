package zht

type User struct {
	Name      string `json:"name" gqlgen:"name"`
	OpenId    string `json:"open_id" gqlgen:"openId"`
	AvatarUrl string `json:"avatar_url" gqlgen:"avatarUrl"`
}
