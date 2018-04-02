// import WebSocket from 'ws';

export const connectWS = ({apiConnected, apiError, apiClosed}) => {
  // const ws = new WebSocket(`ws://${document.location.host}/socket`);
  const ws = new WebSocket(`ws://localhost:8080`);

  ws.onopen = apiConnected;
  ws.onerror = (error) => {
    console.log(error);
    apiError();
  };
  ws.onclose = apiClosed;
  ws.onmessage = ({data}) => console.log('message received', data);

  return {
    close() {
      ws.close();
      // ws.removeAllListeners();
    }
  }
};