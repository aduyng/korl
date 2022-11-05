import { ref, getDatabase, set } from "firebase/database";
import { Box } from "@mui/material";
import { useObject } from "react-firebase-hooks/database";
import ParticipantView from "../../components/ParticipantView";
import { useAuth } from "../../context/Auth";
import { KOrL, Participant } from "../../@types";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Content = () => {
  const { user } = useAuth();
  const [snapshot, loading] = useObject(ref(getDatabase(), "korl"));
  const [korl, setKorL] = useState<KOrL | null>(null);
  const [participant, setParticipant] = useState<Participant | null>(null);

  useEffect(() => {
    if (!snapshot || !user) {
      return;
    }
    (async () => {
      const korl = snapshot.val() as KOrL;
      setKorL(korl);
      const existingParticipant = korl.participants[user.uid];
      if (!existingParticipant) {
        const createdParticipant: Participant = {
          uid: user.uid,
          votes: [],
        };

        await set(
          ref(getDatabase(), `korl/participants/${user.uid}`),
          createdParticipant
        );
        return setParticipant(createdParticipant);
      }

      return setParticipant(korl.participants[user.uid]);
    })();
  }, [snapshot, user]);

  if (loading || !korl) {
    return <Loader size={40} />;
  }

  if (!participant) {
    return null;
  }
  return (
    <Box>
      <ParticipantView
        mode={korl.mode}
        participant={participant}
        answers={korl?.answers}
      />
    </Box>
  );
};

export default Content;
