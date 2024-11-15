import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import prisma from "../../../prisma/client";
import authOptions from "../../auth/authOptions";
import AssigneeSelect from "../../components/AssigneeSelect";
import IssueDeleteButton from "../_components/IssueDeleteButton";
import IssueDetails from "../_components/IssueDetails";
import IssueEditButton from "../_components/IssueEditButton";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

const IsseDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) return notFound();

  await delay(2000);
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className={`lg:col-span-4`}>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <IssueEditButton issueId={issue.id} />
            <IssueDeleteButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IsseDetailPage;
