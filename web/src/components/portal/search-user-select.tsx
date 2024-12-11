import {
  searchUserSelectQuery,
  searchUserSelectQuery$data,
} from "__generated__/searchUserSelectQuery.graphql";
import { Select, SelectProps, Spin } from "antd";
import { useRef, useState } from "react";
import { useRelayEnvironment } from "react-relay";
import { fetchQuery, graphql } from "relay-runtime";

type SearchUserSelectProps = {
  onSelectUser: (
    user: searchUserSelectQuery$data["searchFeishuUser"][0],
  ) => void;
} & SelectProps;

export function SearchUserSelect(props: SearchUserSelectProps) {
  const environment = useRelayEnvironment();
  const [fetching, setFetching] = useState(false);
  const refFetchId = useRef<string | null>(null);
  const [result, setResult] = useState<
    searchUserSelectQuery$data["searchFeishuUser"] | undefined
  >();

  return (
    <Select
      {...props}
      onSelect={(user) => {
        const u = result?.find((u) => u.openId === user.value);
        if (u) {
          props.onSelectUser(u);
        }
      }}
      loading={fetching}
      showSearch
      options={result?.map((u) => ({
        label: u.name,
        value: u.openId,
        avartarUrl: u.avatarUrl,
      }))}
      onSearch={async (keyword) => {
        refFetchId.current = Date.now().toString();
        const fetchId = refFetchId.current;
        setFetching(true);
        setResult([]);
        const result = await fetchQuery<searchUserSelectQuery>(
          environment,
          graphql`
            query searchUserSelectQuery($keyword: String!) {
              searchFeishuUser(keyword: $keyword) {
                openId
                name
                avatarUrl
              }
            }
          `,
          { keyword },
        ).toPromise();
        setFetching(false);
        if (refFetchId.current === fetchId) {
          setResult(result?.searchFeishuUser);
        }
      }}
      filterOption={false}
      labelInValue
      notFoundContent={
        fetching ? (
          <div className="flex h-full min-h-16 items-center justify-center">
            <Spin size="small" />
          </div>
        ) : null
      }
    />
  );
}
