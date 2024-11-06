export type Answer = {
  answer: "Y" | "N";
};

export type Vote = {
  voted: "Y" | "N";
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
