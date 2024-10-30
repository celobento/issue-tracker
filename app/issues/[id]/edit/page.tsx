import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import IssueFormPage from "../../_components/IssueForm";

//interface Props {
//  params: { id: string };
//}

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) return notFound();
  return <IssueFormPage issue={issue} />;
};

export default EditIssuePage;
