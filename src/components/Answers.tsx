import range from "lodash/range";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import { lighten, Typography, useTheme } from "@mui/material";
import { Answer, Vote } from "../@types";
import { useMemo } from "react";
import CheckBox from "@mui/icons-material/CheckBox";

const Answers = ({
  votes,
  answers,
}: {
  votes: { [key: number]: Vote };
  answers: { [key: number]: Answer };
}) => {
  const theme = useTheme();

  const { kBgColor, lBgColor } = useMemo(() => {
    return {
      kBgColor: lighten(theme.palette.primary.light, 0.75),
      lBgColor: lighten(theme.palette.secondary.light, 0.75),
    };
  }, [theme]);

  return (
    <TableContainer component={Box} sx={{ p: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              component="th"
              align="right"
              sx={{
                borderBottomColor: theme.palette.common.black,
              }}
            >
              Question #
            </TableCell>
            <TableCell
              component="th"
              align="center"
              sx={{
                backgroundColor: kBgColor,
                borderBottomColor: theme.palette.common.black,
              }}
            >
              Yes
            </TableCell>
            <TableCell
              component="th"
              align="center"
              sx={{
                backgroundColor: lBgColor,
                borderBottomColor: theme.palette.common.black,
              }}
            >
              No
            </TableCell>
            <TableCell
              component="th"
              align="center"
              sx={{
                borderBottomColor: theme.palette.common.black,
              }}
            >
              Result
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {range(0, 10).map((rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell component="th" scope="row" align="right">
                {rowIndex + 1}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: kBgColor,
                }}
              >
                <Radio
                  inputProps={{ name: `question${rowIndex}` }}
                  checked={votes[rowIndex]?.voted === "Y"}
                  disabled
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: lBgColor,
                }}
              >
                <Radio
                  inputProps={{ name: `question${rowIndex}` }}
                  checked={votes[rowIndex]?.voted === "N"}
                  disabled
                />
              </TableCell>

              <TableCell align="center">
                {votes[rowIndex]?.voted === answers[rowIndex]?.answer && (
                  <CheckBox color="success" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 2,
        }}
      >
        <Typography variant="caption">Your score</Typography>
        <Typography
          variant="h1"
          sx={{ color: theme.palette.primary.main, fontWeight: "bolder" }}
        >
          {range(0, 10).reduce(
            (acc, rowIndex) =>
              acc +
              (votes[rowIndex]?.voted === answers[rowIndex]?.answer ? 1 : 0),
            0
          )}
        </Typography>
      </Box>
    </TableContainer>
  );
};

export default Answers;
