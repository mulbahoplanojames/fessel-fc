export type Player = {
  id?: number;
  name: string;
  position: string;
  number: number;
  featured?: boolean;
  image: string;
  stats: {
    goals?: number;
    assists?: number;
    appearances: number;
    cleanSheets?: number;
    saves?: number;
    yellowCards?: number;
    redCards?: number;
    minutesPlayed?: number;
    passAccuracy?: number;
  };
  playerbio: {
    id: number;
    label: string;
  }[];
};

export interface PrismaPlayerType {
  createdAt: string;
  featured: boolean;
  id: string;
  image: string;
  name: string;
  number: number;
  playerbio: { id: number; label: string }[];
  position: string;
  stats: {
    appearances: number;
    assists: number;
    cleanSheets: number;
    goals: number;
    minutesPlayed: number;
    passAccuracy: number;
    saves: number;
  };
  updatedAt: string;
}

// export type Player = {
//   id: number;
//   name: string;
//   position: string;
//   number: number;
//   featured?: boolean;
//   image: string;
//   stats: {
//     goals?: number;
//     assists?: number;
//     appearances: number;
//     cleanSheets?: number;
//     saves?: number;
//   };
//   playerbio: {
//     id: number;
//     label: string;
//   }[];
// };
