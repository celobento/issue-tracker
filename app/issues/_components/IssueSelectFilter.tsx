"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statusList: { label: string; value?: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueSelectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "null"}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="null">All</Select.Item>
          {statusList.map((status) => (
            <Select.Item key={status.value} value={status.value || "null"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueSelectFilter;
