import range from "lodash/range";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import { FormControlLabel, FormGroup, lighten, useTheme } from "@mui/material";
import { Vote } from "../@types";
import { useMemo } from "react";

const Questionaires = ({
  votes,
  onChange,
}: {
  votes: { [key: number]: Vote };
  onChange: ({
    rowIndex,
    voted,
  }: {
    rowIndex: number;
    voted: "Y" | "N";
  }) => void;
}) => {
  const theme = useTheme();
  const createRadioOnChangeHandler =
    ({ rowIndex, voted }: { rowIndex: number; voted: "Y" | "N" }) =>
    () =>
      onChange({ rowIndex, voted });

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
              Picture #
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
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Radio
                        inputProps={{ name: `question${rowIndex}` }}
                        checked={votes[rowIndex]?.voted === "Y"}
                        onChange={createRadioOnChangeHandler({
                          rowIndex,
                          voted: "Y",
                        })}
                      />
                    }
                    label="Yes"
                  />
                </FormGroup>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: lBgColor,
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Radio
                        inputProps={{ name: `question${rowIndex}` }}
                        checked={votes[rowIndex]?.voted === "N"}
                        onChange={createRadioOnChangeHandler({
                          rowIndex,
                          voted: "N",
                        })}
                      />
                    }
                    label="No"
                  />
                </FormGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Questionaires;
