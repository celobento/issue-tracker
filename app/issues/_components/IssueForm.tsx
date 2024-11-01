"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { issueSchema } from "../../validationSchema";

//const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//  ssr: false,
//});

type IssueForm = z.infer<typeof issueSchema>;

//interface Props {
//issue?: Issue
//}

const IssueFormPage = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues/list");
      // force refresh
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div>
      {error && (
        <Callout.Root color="red" className={`mb-5`}>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className={`max-w-wl space-y-3`} onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          color={errors.title ? "red" : "indigo"}
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Update issue" : "Submit New"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueFormPage;
