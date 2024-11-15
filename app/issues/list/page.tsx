import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import prisma from "../../../prisma/client";
import Pagination from "../../components/Pagination";
import IssueTable, { columnNames, IssueQuery } from "../IssueTable";
import ActionButon from "./ActionButon";

interface Props {
  searchParams: IssueQuery;
}

const IssuePage = async ({ searchParams }: Props) => {
  const stautses = Object.values(Status);
  const status = stautses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = {
    status,
  };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <ActionButon />
      <IssueTable searchParams={searchParams} issues={issues} />
      {issueCount >= pageSize && (
        <Pagination
          itemPerPage={pageSize}
          currentPage={page}
          countItem={issueCount}
        />
      )}
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuePage;
