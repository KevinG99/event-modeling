import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import VerifyEventModel from './components/modelVerifiactionSlice/VerifyEventModel';
import { ActionTypes, StickyType } from './types';
import EventDetails from './components/eventDetailsSlice/EventDetails';
import CommandDetails from './components/commandDetailsSlice/CommandDetails';
import ViewDetails from './components/viewDetailsSlice/ViewDetails';
import SectionDetails from './components/sectionDetailsSlice/SectionDetails';

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('react-page');
  const root = createRoot(container);
  window.onmessage = (event) => {
    const msg = event.data.pluginMessage;
    if (msg) {
      renderComponent(msg, root);
      console.log(msg);
    }
  };
  root.render(
    <>
      <VerifyEventModel />
      <App />
    </>,
  );
});


function renderComponent(msg, root) {
  switch (msg.action) {
    case ActionTypes.StickyNoteSelected:
      switch (msg.data.stickyType) {
        case StickyType.Event:
          root.render(<EventDetails {...msg}/>);
          break;
        case StickyType.Command:
          root.render(<CommandDetails />);
          break;
        case StickyType.View:
          root.render(<ViewDetails />);
          break;
        default:
          break;
      }
      break;
    case ActionTypes.NothingSelected:
      root.render(
        <>
          <VerifyEventModel {...msg} />
          <App />
        </>,
      );
      break;
    case ActionTypes.SectionSelected:
      root.render(<SectionDetails />);
      break;
    default:
      break;
  }
}