import { ChangeEvent, useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useObject } from "react-firebase-hooks/database";
import { getDatabase, ref, set } from "firebase/database";
import { KOrL } from "../../@types";
import Loader from "../../components/Loader";

export default function ControlPanel() {
  const { user } = useAuth();
  const [snapshot, loading] = useObject(ref(getDatabase(), "korl"));
  const [korl, setKorL] = useState<KOrL | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/", { replace: true });
    }
    if (!snapshot || !user) {
      return;
    }
    const korl = snapshot.val() as KOrL;
    setKorL(korl);
  }, [user, navigate, snapshot]);

  const onSwitchChange = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    set(ref(getDatabase(), "korl/mode"), checked ? "ongoing" : "ended");
  };

  if (loading || !korl) {
    return <Loader size={40} />;
  }

  return (
    <Box sx={{ p: 2 }}>
      <FormGroup>
        <FormControlLabel
          control={<Switch onChange={onSwitchChange} />}
          checked={korl.mode === "ongoing"}
          label={korl.mode === "ongoing" ? "Ongoing" : "Ended"}
        />
      </FormGroup>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption">Participant Count #</Typography>
          <Typography variant="h1">
            {Object.keys(korl.participants).length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
