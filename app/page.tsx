import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <div>
      <Pagination countItem={100} itemPerPage={10} currentPage={10} />
    </div>
  );
}
