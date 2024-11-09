import Pagination from "./components/Pagination";

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: Props) {
  return (
    <div>
      <Pagination
        countItem={100}
        itemPerPage={10}
        currentPage={parseInt(searchParams.page)}
      />
    </div>
  );
}
