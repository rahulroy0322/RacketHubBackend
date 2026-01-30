const tournamentStatus = <const>['upcoming', 'live', 'completed'];

const matchStatus = <const>['scheduled', 'live', 'completed'];

type TournamentStatusType = (typeof tournamentStatus)[number];
type MatchStatusType = (typeof matchStatus)[number];

export type { MatchStatusType, TournamentStatusType };

export { matchStatus, tournamentStatus };
