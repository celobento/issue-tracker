import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className={`max-w-wl space-y-3`}>
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit New issue</Button>
    </div>
  );
};

export default NewIssuePage;
