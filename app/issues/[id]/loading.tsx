import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const LoadingDetailIssue = () => {
  return (
    <Box className={`max-w-xl`}>
      <Skeleton />
      <Flex className={`space-x-3 justify-center items-center my-2`}>
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className={`prose`}>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingDetailIssue;
