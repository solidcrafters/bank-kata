export const connectWS = ({apiConnected, apiError, apiClosed, accountEvent}) => {
  // const ws = new WebSocket(`ws://${document.location.host}/socket`);
  const ws = new WebSocket(`ws://localhost:5000`);

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