import { notFound } from "next/navigation";

// to solve Error: navigator is not defined
//import IssueFormPage from "../../_components/IssueForm";

import dynamic from "next/dynamic";
import prisma from "../../../../prisma/client";
import IssueFormSkeleton from "./loading";

const IssueFormPage = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

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
