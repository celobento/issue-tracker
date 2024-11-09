import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

interface Props {
  countItem: number;
  itemPerPage: number;
  currentPage: number;
}

const Pagination = ({ countItem, itemPerPage, currentPage }: Props) => {
  const qtdPage = Math.ceil(countItem / itemPerPage);
  return (
    <Flex align="center" gap="2">
      <Button color="gray" variant="soft" disabled={currentPage <= 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage <= 1}>
        <ChevronLeftIcon />
      </Button>
      <Text>
        {" "}
        Page {currentPage} from {qtdPage}{" "}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage >= qtdPage}>
        <DoubleArrowRightIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage >= qtdPage}>
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
