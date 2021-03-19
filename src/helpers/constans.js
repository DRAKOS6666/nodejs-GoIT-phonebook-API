const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NO_CONTENT: 204,
}

const Subscription = {
  FREE: 'free',
  PRO: 'pro',
  PREMIUM: 'premium'
}

module.exports = {
  HttpCode, Subscription
}
