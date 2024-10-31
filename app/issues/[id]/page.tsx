import { ResetIcon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Box, Button, Flex, Grid } from "@radix-ui/themes";
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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className={`lg:col-span-4`}>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <IssueEditButton issueId={issue.id} />
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <IssueDeleteButton issueId={issue.id} />
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Title>Confirm delete issue</AlertDialog.Title>
              <AlertDialog.Description>
                Are you sure remove this issue. This can't be undone.
              </AlertDialog.Description>
              <Flex mt="4" gap="3">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    <ResetIcon />
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button color="red">
                    <TrashIcon />
                    Delete
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </Flex>
      </Box>
    </Grid>
  );
};

export default IsseDetailPage;
