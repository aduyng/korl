export type Answer = {
  answer: "K" | "L";
};

export type Vote = {
  voted: "K" | "L";
  createdAt: Date;
};

export type Participant = {
  uid: string;
  name?: string;
  votes: { [key: number]: Vote };
};

export type KOrL = {
  mode: "ongoing" | "ended";
  participants: { [key: string]: Participant };
  answers: { [key: number]: Answer };
};
