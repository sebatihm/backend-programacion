export class JWTPayload {
  issuer: number;
  user_name: string;
  role: string;
  department_id: number;
  permissions: string[];
}
