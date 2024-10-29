import { notFound } from "next/navigation";
import prisma from "../../../prisma/client";

interface Props {
  params: { id: string };
}

const IsseDetailPage = async ({ params }: Props) => {
  if (typeof params.id !== "number") return notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) return notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
    </div>
  );
};

export default IsseDetailPage;
