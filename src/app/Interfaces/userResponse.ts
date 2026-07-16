export const SubscriptionTypeLabels: Record<number, string> = {
  0: 'Free',
  1: 'Trial',
  2: 'Pro',
};

export interface UserResponse {
  id: number;
  username: string;
  subcription: number;
}
