import { set, ref, getDatabase } from "firebase/database";
import { Answer, Participant } from "../@types";
import Answers from "./Answers";
import ProfileInput from "./ProfileInput";
import Questionaires from "./Questionaires";

const ParticipantView = ({
  participant,
  mode,
  answers,
}: {
  participant: Participant;
  mode: "ongoing" | "ended";
  answers: { [key: number]: Answer };
}) => {
  const onProfileSubmit = async ({ name }: { name: string }) => {
    set(ref(getDatabase(), `korl/participants/${participant.uid}/name`), name);
  };

  const onQuestionairesChange = async ({
    rowIndex,
    voted,
  }: {
    rowIndex: number;
    voted: "Y" | "N";
  }) => {
    set(
      ref(
        getDatabase(),
        `korl/participants/${participant.uid}/votes/${rowIndex}`
      ),
      { voted, createdAt: Date.now() }
    );
  };

  if (mode === "ended") {
    return <Answers votes={participant.votes || {}} answers={answers} />;
  }

  if (!participant.name) {
    return <ProfileInput onSubmit={onProfileSubmit} />;
  }

  return (
    <Questionaires
      votes={participant.votes || {}}
      onChange={onQuestionairesChange}
    />
  );
};

export default ParticipantView;
