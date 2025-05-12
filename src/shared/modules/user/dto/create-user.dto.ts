export interface CreateUserDto {
  email: string;
  firstname: string;
  lastname: string;
  avatarUrl?: string;
  password: string;
  type: 'usual' | 'pro';
}
