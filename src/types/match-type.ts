export type DBMatch = {
  id?: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string | File;
  awayTeamLogo: string | File;
  date: string;
  time: string;
  venue: string;
  competition?: string;
  ticketsAvailable?: boolean;
  upcoming?: boolean;
  isFeatured?: boolean;
  isLive?: boolean;
  badge?: {
    title: string;
    color: string;
    duration: string;
  };
  matchPreview?: {
    id: number | string;
    label: string;
  }[];
  playersToWatch?: {
    id: number;
    name: string;
    position?: string;
    team?: string;
    avatar?: string;
  }[];
  highlights?: {
    id: number;
    title: string;
    description?: string;
    date?: string;
    league?: string;
  }[];
  backToback?: {
    homeTeam: {
      team: string;
      win: number;
    };
    awayTeam?: {
      team: string;
      win: number;
    };
    bothTeams?: {
      draw: number;
    };
  };
  matchResult?: {
    homeTeamScore: number;
    awayTeamScore: number;
    competition: string;
    status: string;
  };
  tickets?: {
    price: number;
    quantity: number;
    sections: {
      name: string;
      price: number;
      available: number;
    }[];
  };
};

export type Match = {
  id?: number | string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string | null;
  awayTeamLogo: string | null;
  date: string;
  time: string;
  venue: string;
  competition?: string;
  ticketsAvailable?: boolean;
  upcoming?: boolean;
  isFeatured?: boolean;
  isLive?: boolean;
  badge?: {
    title: string;
    color: string;
    duration: string;
  };
  matchPreview?: {
    id: number | string;
    label: string;
  }[];
  playersToWatch?: {
    id: number;
    name: string;
    position?: string;
    team?: string;
    avatar?: string;
  }[];
  highlights?: {
    id: number;
    title: string;
    description?: string;
    date?: string;
    league?: string;
  }[];
  backToback?: {
    homeTeam: {
      team: string;
      win: number;
    };
    awayTeam?: {
      team: string;
      win: number;
    };
    bothTeams?: {
      draw: number;
    };
  };
  matchResult?: {
    homeTeamScore: number;
    awayTeamScore: number;
    competition: string;
    status: string;
  };
};

export interface PrismaMatchType {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string | null;
  awayTeamLogo: string | null;
  date: string;
  time: string;
  venue: string;
  competition: string | null;
  ticketsAvailable: boolean | null;
  upcoming: boolean | null;
  isFeatured: boolean | null;
  isLive: boolean | null;
  badge: {
    title: string;
    color: string;
    duration: string;
  };
  matchPreview: {
    id: number;
    label: string;
  }[];
  playersToWatch: {
    id: number;
    name: string;
    position: string;
    team: string;
    avatar: string;
  }[];
  highlights: {
    id: number;
    title: string;
    description: string;
    date: string;
    league: string;
  }[];
  backToback: {
    homeTeam: {
      team: string;
      win: number;
    };
    awayTeam: {
      team: string;
      win: number;
    };
    bothTeams: {
      draw: number;
    };
  };
  matchResult: {
    homeTeamScore: number;
    awayTeamScore: number;
    competition: string;
    status: string;
  } | null;
  tickets: {
    price: number;
    quantity: number;
    sections: {
      name: string;
      price: number;
      available: number;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}
