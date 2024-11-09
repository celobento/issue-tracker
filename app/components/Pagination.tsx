"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  countItem: number;
  itemPerPage: number;
  currentPage: number;
}

const Pagination = ({ countItem, itemPerPage, currentPage }: Props) => {
  const qtdPage = Math.ceil(countItem / itemPerPage);
  const router = useRouter();
  const searchParameter = useSearchParams();
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParameter);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  return (
    <Flex align="center" gap="2">
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage <= 1}
        onClick={() => {
          changePage(1);
        }}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage <= 1}
        onClick={() => {
          changePage(currentPage - 1);
        }}
      >
        <ChevronLeftIcon />
      </Button>
      <Text>
        {" "}
        Page {currentPage} from {qtdPage}{" "}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage >= qtdPage}
        onClick={() => {
          changePage(currentPage + 1);
        }}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage >= qtdPage}
        onClick={() => {
          changePage(qtdPage);
        }}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
