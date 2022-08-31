import { expressjwt, GetVerificationKey } from 'express-jwt'
import expressJwtPermission from 'express-jwt-permissions'
import { expressJwtSecret } from 'jwks-rsa'
import { appEnv } from './env'

const checkJwt = expressjwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: appEnv.AUTH0_JWKS_URI
  }) as GetVerificationKey,
  audience: appEnv.AUTH0_API_AUDIENCE,
  issuer: appEnv.AUTH0_TOKEN_ISSUER,
  algorithms: ['RS256'],
  requestProperty: 'auth'
})

const guard = expressJwtPermission({
  requestProperty: 'auth',
  permissionsProperty: 'scope'
})
const checkPermission = guard.check.bind(guard)

export {
  checkJwt,
  checkPermission
}
