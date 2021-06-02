function (user, context, callback) {
	const namespace = 'http://localhost:3000';
	const assignedRoles = (context.authorization || {}).roles;

	const idTokenClaims = context.idToken || {};
	const accessTokenClaims = context.accessToken || {};

	idTokenClaims[`${namespace}/roles`] = assignedRoles;
	accessTokenClaims[`${namespace}/roles`] = assignedRoles;

	context.idToken = idTokenClaims;
	context.accessToken = accessTokenClaims;

	callback(null, user, context);
}