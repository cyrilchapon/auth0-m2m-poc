import { expressjwt, GetVerificationKey } from 'express-jwt'
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
  algorithms: ['RS256']
})

export {
  checkJwt
}
