export const connectWS = ({apiConnected, apiError, apiClosed, accountEvent}) => {
  const host = document.location.origin.replace(/^http/, 'ws').replace(/:(\d+)/, ':5000')
  const ws = new WebSocket(host);

  ws.onopen = apiConnected;
  ws.onerror = (error) => {
    console.error('Error on WebSocket', error);
    apiError(error);
  };
  ws.onclose = apiClosed;
  ws.onmessage = ({data}) => {
    console.log('message received', data);
    const event = JSON.parse(data);
    accountEvent(event)
  };

  return {
    close() {
      ws.close();
    }
  }
};