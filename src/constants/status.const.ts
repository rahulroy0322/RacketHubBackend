const tournamentStatus = <const>['upcoming', 'live', 'completed'];

type TournamentStatusType = (typeof tournamentStatus)[number];

const matchStatus = <const>['scheduled', 'live', 'completed'];
type MatchStatusType = (typeof matchStatus)[number];

export type { MatchStatusType, TournamentStatusType };

export { matchStatus, tournamentStatus };
