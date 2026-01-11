const userRoles = <const>['admin', 'super', 'user'];

type RoleType = (typeof userRoles)[number];

export type { RoleType };

export { userRoles };
