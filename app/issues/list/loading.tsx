import { Skeleton } from "@/app/components";
import { Table } from "@radix-ui/themes";
import ActionButon from "./ActionButon";

const loading = () => {
  const issues = [1, 2, 3, 4, 5];
  return (
    <div>
      <ActionButon />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className={`hidden md:table-cell`}>
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className={`hidden md:table-cell`}>
            Issue
          </Table.ColumnHeaderCell>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className={`block md:hidden`}>
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className={`hidden md:table-cell`}>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className={`hidden md:table-cell`}>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default loading;
