import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useObject } from "react-firebase-hooks/database";
import { getDatabase, ref } from "firebase/database";
import { KOrL } from "../../@types";
import Loader from "../../components/Loader";
import { map, range, sortBy, uniq } from "lodash";

type ParticipantResult = {
  name: string;
  correctAnswerCount: number;
  rank: number;
};
export default function Board() {
  const { user } = useAuth();
  const [snapshot, loading] = useObject(ref(getDatabase(), "korl"));
  const [korl, setKorL] = useState<KOrL | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
    if (!snapshot || !user) {
      return;
    }
    const korl = snapshot.val() as KOrL;
    setKorL(korl);
  }, [user, navigate, snapshot]);

  const { rows } = useMemo(() => {
    if (!korl) {
      return { rows: [] };
    }
    const { answers, participants } = korl;

    const items = Object.values(participants).reduce((memo, participant) => {
      const { name } = participant;
      if (!name) {
        return memo;
      }
      const correctAnswerCount = range(0, 10).reduce((acc, index) => {
        const votes = participant.votes || [];
        return acc + (answers[index].answer === votes[index]?.voted ? 1 : 0);
      }, 0);
      memo.push({ name, correctAnswerCount, rank: 0 });
      return memo;
    }, [] as ParticipantResult[]);

    const sortedItems = sortBy(items, (item) => item.correctAnswerCount * -1);
    const voteCounts = uniq(map(sortedItems, "correctAnswerCount"));

    return {
      rows: sortedItems.map((item) => ({
        ...item,
        rank: voteCounts.indexOf(item.correctAnswerCount) + 1,
      })),
    };
  }, [korl]);

  if (loading || !korl) {
    return <Loader size={40} />;
  }
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3">Result</Typography>
      <TableContainer component={Box} sx={{ p: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                component="th"
                align="right"
                sx={{
                  borderBottomColor: theme.palette.common.black,
                }}
              >
                Rank #
              </TableCell>
              <TableCell
                component="th"
                align="left"
                sx={{
                  borderBottomColor: theme.palette.common.black,
                }}
              >
                Name
              </TableCell>
              <TableCell
                component="th"
                align="right"
                sx={{
                  borderBottomColor: theme.palette.common.black,
                }}
              >
                Correct Answers
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              let backgroundColor;
              if (row.rank === 1) {
                backgroundColor = theme.palette.primary.dark;
              } else if (row.rank === 2) {
                backgroundColor = theme.palette.primary.main;
              } else if (row.rank === 3) {
                backgroundColor = theme.palette.primary.light;
              }
              const color = backgroundColor
                ? theme.palette.getContrastText(backgroundColor)
                : undefined;
              return (
                <TableRow
                  key={row.name}
                  sx={{ backgroundColor, "& td": { color, fontSize: "2rem" } }}
                >
                  <TableCell align="right">{row.rank}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="right">{row.correctAnswerCount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
