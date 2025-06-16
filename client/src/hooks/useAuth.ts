import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: number;
  username: string;
  displayName: string;
  avatarUrl: string;
  steamId: string;
}

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) return null;
        return response.json();
      } catch {
        return null;
      }
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      await fetch('/auth/logout');
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      window.location.href = '/';
    },
  });

  const loginWithSteam = () => {
    window.location.href = '/auth/steam';
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginWithSteam,
    logout: logout.mutate,
  };
}
