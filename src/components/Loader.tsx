import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Loader = ({
  center,
  size,
  color,
}: CircularProgressProps & { center?: boolean }) => {
  if (center) {
    return (
      <Grid
        container
        spacing={0}
        sx={{
          display: "flex",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            data-testid="circularProgressIcon"
            disableShrink
            size={size}
            color={color}
          />
        </Grid>
      </Grid>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          disableShrink
          size={size}
          color={color}
          data-testid="circularProgressIcon"
        />
      </Box>
    </Box>
  );
};

export default Loader;
