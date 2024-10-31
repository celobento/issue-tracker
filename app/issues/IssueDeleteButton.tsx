import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red">
      <TrashIcon />
      Edit Issue
    </Button>
  );
};

export default IssueDeleteButton;
