import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import prisma from "../../../prisma/client";
import IssueDeleteButton from "../IssueDeleteButton";
import IssueDetails from "../IssueDetails";
import IssueEditButton from "../IssueEditButton";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex className={`space-x-2`}>
          <IssueEditButton issueId={issue.id} />
          <IssueDeleteButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IsseDetailPage;
