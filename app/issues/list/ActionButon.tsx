import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueSelectFilter from "../_components/IssueSelectFilter";

const ActionButon = () => {
  return (
    <Flex justify="between">
      <IssueSelectFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default ActionButon;
