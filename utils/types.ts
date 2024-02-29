export type ServerQuery = {
  ip: string;
  port: number;
  motd: {
      raw: string[]
      clean: string[]
      html: string[]
  }
  players: {
      online: number;
      max: number;
  }
  version: string
  online: boolean
  protocol: {
      version: number
      name: string
  }
  hostname: string
  icon: string
  debug: {
      cached?: boolean
      url: string,
      cachetime: number
      cacheexpire: number
      error?: {
          query: string
      }
  },
  eula_blocked: boolean
}
