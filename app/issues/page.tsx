import { Table } from "@radix-ui/themes";

import prisma from "../../prisma/client";
import Link from "../components/Link";
import ActionButon from "./ActionButon";
import IssueStatusBadge from "./IssueStatusBadge";

const IssuePage = async () => {
  const issues = await prisma.issue.findMany();

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
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className={`block md:hidden`}>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className={`hidden md:table-cell`}>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className={`hidden md:table-cell`}>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuePage;
