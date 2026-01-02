import {createCookieSessionStorage} from '@shopify/remix-oxygen';

export type SessionData = {
  customerAccessToken?: string;
};

export type SessionFlashData = {
  error: string;
};

export type AppSession = {
  get: (key: keyof SessionData) => SessionData[keyof SessionData] | undefined;
  set: (key: keyof SessionData, value: SessionData[keyof SessionData]) => void;
  unset: (key: keyof SessionData) => void;
  commit: () => Promise<string>;
};

export const sessionStorage = createCookieSessionStorage<SessionData, SessionFlashData>({
  cookie: {
    name: 'dailyloom_session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET || 'foobar'],
  },
});

export async function getSession(request: Request): Promise<AppSession> {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));

  return {
    get: (key) => session.get(key),
    set: (key, value) => session.set(key, value),
    unset: (key) => session.unset(key),
    commit: () => sessionStorage.commitSession(session),
  };
}
