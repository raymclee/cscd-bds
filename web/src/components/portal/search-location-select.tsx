import { useRelayEnvironment } from "react-relay";

import { useRef } from "react";

import { Select, SelectProps, Spin } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

type SearchLocationResult = {
  inputtips: Array<{
    id: string;
    name: string;
    address: string;
    province: {
      area: {
        id: string;
      };
      id: string;
      name: string;
    };
    city: {
      id: string;
      name: string;
    };
    district: {
      id: string;
      name: string;
    };
    lng: number;
    lat: number;
  }>;
};

type SearchLocationSelectProps = {
  areaId?: string;
  onAddressSelected?: (
    data: SearchLocationResult["inputtips"][number] & DefaultOptionType,
  ) => void;
} & SelectProps;

export function SearchLocationSelect({
  areaId,
  onAddressSelected,
  ...props
}: SearchLocationSelectProps) {
  const [fetching, setFetching] = useState(false);
  const refFetchId = useRef<string | null>(null);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [notFoundText, setNotFoundText] = useState<string | null>("请输入地址");
  const abortControllerRef = useRef<AbortController | null>(null);

  const onSearch = useDebounceCallback((keyword) => {
    if (!areaId || keyword.length < 2) return;
    // Abort any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    const newAbortController = new AbortController();

    abortControllerRef.current = newAbortController;
    // Call onSearch with new search term and abort controller

    refFetchId.current = Date.now().toString();
    const fetchId = refFetchId.current;
    setFetching(true);
    props.onChange?.(null);
    setOptions([]);

    fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        query: `
          query searchLocationSelectQuery($areaId: ID!, $keyword: String!) {
            inputtips(areaId: $areaId, keyword: $keyword) {
              id
              name
              address
              province {
                area {
                  id
                }
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
              lng
              lat
            }
          }
        `,
        variables: {
          areaId,
          keyword,
        },
      }),
      signal: abortControllerRef.current?.signal,
    })
      .then((res) => res.json() as Promise<{ data: SearchLocationResult }>)
      .then(({ data: result }) => {
        if (refFetchId.current === fetchId) {
          setOptions(
            result?.inputtips.map((u) => ({
              id: u.id,
              label: u.name,
              value: u.name,
              data: u,
              address: `${u.province?.name}${u.city?.name ?? ""}${u.district?.name}${u.address}`,
            })),
          );
        }
        if (result?.inputtips.length === 0) {
          setNotFoundText("没有找到相关地址");
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
        props.onChange?.(value);
        onAddressSelected?.(
          option as SearchLocationResult["inputtips"][number] &
            DefaultOptionType,
        );
      }}
      // value={value}
      filterOption={false}
      // labelInValue
      notFoundContent={
        fetching ? (
          <div className="flex items-center justify-center">
            <Spin size="small" />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-xs text-gray-500">{notFoundText}</span>
          </div>
        )
      }
      optionRender={(option) => {
        const address = `${option?.data?.data?.province?.name}${option?.data?.data?.city?.name ?? ""}${option?.data?.data?.district?.name ?? ""}${option?.data?.data?.address}`;
        return (
          <div
            className="flex flex-col items-baseline gap-1"
            key={option?.data?.id}
          >
            <div>{option?.label}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>{address}</span>
            </div>
          </div>
        );
      }}
      labelRender={(label) => {
        const o = options?.find((o) => o.value === label.value);
        return o?.address;
      }}
    />
  );
}
