export {}

// Create a type for Roles
export type Roles = 'admin' | 'moderator'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}