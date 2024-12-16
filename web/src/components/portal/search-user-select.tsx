import { searchUserSelectQuery } from "__generated__/searchUserSelectQuery.graphql";
import { Select, SelectProps, Spin } from "antd";
import { useRef, useState } from "react";
import { useRelayEnvironment } from "react-relay";
import { fetchQuery, graphql } from "relay-runtime";
import { useDebounceCallback } from "usehooks-ts";
type SearchUserSelectProps = {} & SelectProps;

export function SearchUserSelect(props: SearchUserSelectProps) {
  const environment = useRelayEnvironment();
  const [fetching, setFetching] = useState(false);
  const refFetchId = useRef<string | null>(null);
  const [options, setOptions] = useState<SelectProps["options"]>([]);

  const onSearch = useDebounceCallback((keyword) => {
    refFetchId.current = Date.now().toString();
    const fetchId = refFetchId.current;
    setFetching(true);
    setOptions([]);
    fetchQuery<searchUserSelectQuery>(
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
    )
      .toPromise()
      .then((result) => {
        if (refFetchId.current === fetchId) {
          setOptions(
            result?.searchFeishuUser.map((u) => ({
              label: u.name,
              value: u.openId,
              avatarUrl: u.avatarUrl,
            })),
          );
        }
      })
      .catch(console.error)
      .finally(() => {
        setFetching(false);
      });
  }, 500);

  return (
    <Select
      {...props}
      loading={fetching}
      showSearch
      options={options}
      onSearch={onSearch}
      filterOption={false}
      labelInValue
      notFoundContent={
        fetching ? (
          <div className="flex items-center justify-center">
            <Spin size="small" />
          </div>
        ) : null
      }
      labelRender={(label) => {
        const u = options?.find((u) => u.value === label.value);
        if (!u) return;
        return (
          <div className="flex items-center">
            <img
              src={u?.avatarUrl}
              className="mr-1 h-6 w-6 rounded-full"
              alt={String(u?.label) || ""}
            />
            {u?.label}
          </div>
        );
      }}
      optionRender={(option) => {
        return (
          <div className="flex items-center">
            <img
              src={option.data.avatarUrl}
              className="mr-1 h-6 w-6 rounded-full"
              alt={String(option.data.label) || ""}
            />
            {option.data.label}
          </div>
        );
      }}
    />
  );
}
