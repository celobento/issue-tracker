"use client";

import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

const NewIssuePage = () => {
  return (
    <div className={`max-w-wl space-y-3`}>
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit New issue</Button>
    </div>
  );
};

export default NewIssuePage;
