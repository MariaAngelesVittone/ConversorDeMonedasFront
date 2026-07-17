export interface AdminUser {
  id: number;
  email: string;
  username: string;
  subscriptionType: number;
  conversionLimit: number;
  isAdmin: boolean;
}
