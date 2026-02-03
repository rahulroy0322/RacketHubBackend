const userRoles = <const>['admin', 'super', 'user', 'modretor', 'tester'];

type RoleType = (typeof userRoles)[number];

export type { RoleType };

export { userRoles };
