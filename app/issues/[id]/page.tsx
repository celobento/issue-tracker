import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import prisma from "../../../prisma/client";
import IssueStatusBadge from "../IssueStatusBadge";

interface Props {
  params: { id: string };
}

const IsseDetailPage = async ({ params }: Props) => {
  let issue;
  try {
    issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!issue) return notFound();
  } catch (error) {
    return notFound();
  }
  await delay(2000);
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className={`space-x-3 justify-center items-center my-2`}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className={`prose`}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IsseDetailPage;
