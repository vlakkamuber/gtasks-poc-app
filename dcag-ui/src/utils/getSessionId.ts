import { v4 as uuid } from 'uuid';

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = uuid();
    sessionStorage.setItem('sessionId', sessionId);
  }

  return sessionId;
}

export default getSessionId;
