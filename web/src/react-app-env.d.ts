/// <reference types="react-scripts" />

interface UseAuth0 {
  loading: boolean;
  user: {
    email: string;
    email_verified: boolean;
    name: string;
    nickname: string;
    picture: string;
    sub: stringify;
    updated_at: string;
  };
}

declare module "react-auth0-spa" {
  export const useAuth0 = () => UseAuth0;
}
