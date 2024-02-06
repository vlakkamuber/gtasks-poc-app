function getSessionId(userId: string): string {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = userId + Date.now();
    sessionStorage.setItem('sessionId', sessionId);
  }

  return sessionId;
}

export default getSessionId;
