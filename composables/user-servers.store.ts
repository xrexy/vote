import type { InternalApi } from 'nitropack';

export type ServerArray = InternalApi['/api/v1/server/user-owned']['get']['servers']
export type Server = ServerArray[0] 

export const useUserServers = () => useState<ServerArray>("user-servers", () => []);
