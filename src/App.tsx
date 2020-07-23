import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';

import Controls from './components/Controls/Controls';
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview';
import MenuBar from './components/MenuBar/MenuBar';
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification';
import Room from './components/Room/Room';

import useHeight from './hooks/useHeight/useHeight';
import useRoomState from './hooks/useRoomState/useRoomState';

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
});

const Main = styled('main')({
  overflow: 'hidden',
});

export default function App() {
  const roomState = useRoomState();

  // Here we would like the height of the main container to be the height of the viewport.
  // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
  // not the viewport. This looks bad when the mobile browsers location bar is open.
  // We will dynamically set the height with 'window.innerHeight', which means that this
  // will look good on mobile browsers even after the location bar opens or closes.
  const height = useHeight();

  // const webSocket = new WebSocket("ws://localhost:8080");

  // useEffect(() => {
  //   console.log(1);

  //   webSocket.onmessage = (msg) => {
  //     const data = JSON.parse(msg.data);
  //     if (data.event === "interim-transcription") {
  //       //document.getElementById("transcription-container").innerHTML = data.text;
  //       console.log(data.text);

  //     }
  //   }
  // }, [])

  // const [isPaused, setPause] = useState(false);
  // const ws = useRef<WebSocket>(null);

  // useEffect(() => {
  //     ws.current = new WebSocket("wss://c5047600f0e2.ngrok.io/");
  //     ws.current.onopen = () => console.log("ws opened");
  //     ws.current.onclose = () => console.log("ws closed");

  //     return () => {
  //         ws.current.close();
  //     };
  // }, []);

  // useEffect(() => {
  //     if (!ws.current) return;

  //     ws.current.onmessage = e => {
  //         if (isPaused) return;
  //         const message = JSON.parse(e.data);
  //         console.log("e", message);
  //     };
  // }, [isPaused]);

  return (
    <Container style={{ height }}>
      <MenuBar />
      <Main>
        {roomState === 'disconnected' ? <LocalVideoPreview /> : <Room />}
        <Controls />
      </Main>
      <ReconnectingNotification />
    </Container>
  );
}
