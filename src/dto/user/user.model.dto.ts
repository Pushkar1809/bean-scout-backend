export interface User {
  name: string;
  address?: string | null | undefined;
  pictureUrl: string;
  createdAt: Date;
  updatedAt: Date;
}