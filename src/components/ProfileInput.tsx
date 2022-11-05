import ChevronRight from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const ProfileInput = ({
  onSubmit,
}: {
  onSubmit: ({ name }: { name: string }) => void;
}) => {
  const [name, setName] = useState("");

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onNextClick = () => {
    onSubmit({ name: name.trim() });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ p: 1 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        label="What is your name?"
        variant="outlined"
        fullWidth
        onChange={onNameChange}
      />
      <Button
        fullWidth
        size="large"
        color="primary"
        variant="contained"
        sx={{ mt: 1 }}
        endIcon={<ChevronRight />}
        onClick={onNextClick}
        disabled={!name}
      >
        Next
      </Button>
    </Box>
  );
};

export default ProfileInput;
