import type {HydrogenSession} from '@shopify/hydrogen';
import {createCookieSessionStorage, type Session, type SessionStorage} from '@shopify/remix-oxygen';

/** Cookie session Hydrogen needs for cart and customer-account calls. */
export class AppSession implements HydrogenSession {
  public isPending = false;
  #storage: SessionStorage;
  #session: Session;

  constructor(storage: SessionStorage, session: Session) {
    this.#storage = storage;
    this.#session = session;
  }

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {name: 'dailyloom_session', httpOnly: true, path: '/', sameSite: 'lax', secure: true, secrets},
    });
    const session = await storage.getSession(request.headers.get('Cookie')).catch(() => storage.getSession());
    return new this(storage, session);
  }

  get get() {
    return this.#session.get;
  }

  get has() {
    return this.#session.has;
  }

  set(key: string, value: unknown) {
    this.isPending = true;
    this.#session.set(key, value);
  }

  unset(key: string) {
    this.isPending = true;
    this.#session.unset(key);
  }

  destroy() {
    return this.#storage.destroySession(this.#session);
  }

  commit() {
    this.isPending = false;
    return this.#storage.commitSession(this.#session);
  }
}
