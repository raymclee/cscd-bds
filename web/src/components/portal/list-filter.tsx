import { useLocation, useNavigate } from "@tanstack/react-router";
import { Form, Input, Select } from "antd";
import { tenderStatusOptions } from "~/lib/helper";

type Props = {
  areas?: { label: string; value: string }[];
  showStatus?: boolean;
  showTenderClosingDate?: boolean;
  children?: React.ReactNode;
};

export function ListFilter({
  areas,
  showStatus,
  showTenderClosingDate,
  children,
}: Props) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchText = search.q || "";
  const statusFilter = search.status;
  const areaFilter = search.area;
  const closingDateFilter = search.closing_date;

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-1 flex-wrap items-center gap-4">
        <Form.Item
          label="搜索"
          className="!mb-0 w-full md:w-auto"
          layout="horizontal"
        >
          <Input.Search
            placeholder="搜索"
            value={searchText}
            inputMode="search"
            onChange={(e) => {
              navigate({
                to: ".",
                search: (prev) => ({ ...prev, q: e.target.value }),
                replace: true,
              });
            }}
            allowClear
            type="search"
            onClear={() => {
              navigate({
                to: ".",
                replace: true,
                search: (prev) => ({ ...prev, q: undefined }),
              });
            }}
          />
        </Form.Item>
        {showStatus && (
          <Form.Item label="状态" className="!mb-0 !w-full md:!w-36">
            <Select
              placeholder="状态"
              value={statusFilter}
              onSelect={(value) => {
                navigate({
                  to: ".",
                  search: (prev) => ({ ...prev, status: value }),
                  replace: true,
                });
                // setStatusFilter(value);
              }}
              allowClear
              onClear={() => {
                navigate({
                  to: ".",
                  replace: true,
                  search: (prev) => ({ ...prev, status: undefined }),
                });
              }}
              options={tenderStatusOptions}
            />
          </Form.Item>
        )}
        {areas && areas?.length > 0 && (
          <Form.Item label="区域" className="!mb-0 w-full md:w-36">
            <Select
              placeholder="区域"
              value={areaFilter}
              onSelect={(value) => {
                navigate({
                  to: ".",
                  search: (prev) => ({ ...prev, area: value }),
                  replace: true,
                });
              }}
              allowClear
              onClear={() => {
                navigate({
                  to: ".",
                  replace: true,
                  search: (prev) => ({ ...prev, area: undefined }),
                });
              }}
              options={areas}
            ></Select>
          </Form.Item>
        )}
        {showTenderClosingDate && (
          <Form.Item label="交标日期" className="!mb-0">
            <Select
              placeholder="交标日期"
              value={closingDateFilter}
              options={[
                { label: "升序", value: "asc" },
                { label: "降序", value: "desc" },
              ]}
              onSelect={(value) => {
                navigate({
                  to: ".",
                  search: (prev) => ({ ...prev, closing_date: value }),
                  replace: true,
                });
              }}
              allowClear
              onClear={() => {
                navigate({
                  to: ".",
                  replace: true,
                  search: (prev) => ({ ...prev, closing_date: undefined }),
                });
              }}
            />
          </Form.Item>
        )}
      </div>

      {children}
    </div>
  );
}
