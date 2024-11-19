package zht

type Group struct {
	Name      string `json:"name,omitempty" gqlgen:"name"`
	OpenId    string `json:"id,omitempty" gqlgen:"id"`
	AvatarUrl string `json:"avatarUrl,omitempty" gqlgen:"avatarUrl"`
}
