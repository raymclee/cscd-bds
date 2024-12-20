import { fetchQuery, graphql, useRelayEnvironment } from "react-relay";

import { useEffect, useRef } from "react";

import { Select, SelectProps, Spin } from "antd";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import {
  searchLocationSelectQuery,
  searchLocationSelectQuery$data,
} from "__generated__/searchLocationSelectQuery.graphql";

type SearchLocationSelectProps = {
  onAddressSelected?: (
    address: searchLocationSelectQuery$data["searchLocation"][number],
  ) => void;
} & SelectProps;

export function SearchLocationSelect({
  onAddressSelected,
  ...props
}: SearchLocationSelectProps) {
  const environment = useRelayEnvironment();
  const [fetching, setFetching] = useState(false);
  const refFetchId = useRef<string | null>(null);
  const [options, setOptions] = useState<SelectProps["options"]>([]);

  useEffect(() => {
    if (props.value) {
      setOptions([{ label: props.value, value: props.value }]);
    }
  }, [props.value]);

  const onSearch = useDebounceCallback((keyword) => {
    if (keyword.length < 2) return;

    refFetchId.current = Date.now().toString();
    const fetchId = refFetchId.current;
    setFetching(true);
    setOptions([]);
    fetchQuery<searchLocationSelectQuery>(
      environment,
      graphql`
        query searchLocationSelectQuery($keyword: String!) {
          searchLocation(keyword: $keyword) {
            id
            fullAddress
            province {
              id
              name
            }
            city {
              id
              name
            }
            district {
              id
              name
            }
          }
        }
      `,
      { keyword },
    )
      .toPromise()
      .then((result) => {
        if (refFetchId.current === fetchId) {
          setOptions(
            result?.searchLocation.map((u) => ({
              label: u.fullAddress,
              value: u.fullAddress,
              data: u,
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
      onSelect={(value, option) => {
        onAddressSelected?.(option?.data);
      }}
      filterOption={false}
      // labelInValue
      notFoundContent={
        fetching ? (
          <div className="flex items-center justify-center">
            <Spin size="small" />
          </div>
        ) : null
      }
      optionRender={(option) => {
        return (
          <div className="flex items-baseline gap-1" key={option?.value}>
            <div>{option?.label}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>{option?.data?.data?.province?.name}</span>
              <span>{option?.data?.data?.city?.name}</span>
              <span>{option?.data?.data?.district?.name}</span>
            </div>
          </div>
        );
      }}
      labelRender={(label) => {
        const o = options?.find((o) => o.value === label.value);
        return (
          <div className="flex items-baseline gap-1">
            <div>{o?.label}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>{o?.data?.province?.name}</span>
              <span>{o?.data?.city?.name}</span>
              <span>{o?.data?.district?.name}</span>
            </div>
          </div>
        );
      }}
    />
  );
}
