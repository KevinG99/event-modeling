import { EventMessage } from '../types';
import { moveStickyToSection } from './sliceAndSections';
import { ORANGE_COLOR } from '../../plugin/controller';

export default handleCreateEventStickyNote;

function handleCreateEventStickyNote(msg: EventMessage) {
  createEventStickyNote(msg).then((sticky) => {
    const sectionNode = moveStickyToSection(sticky);
    figma.viewport.scrollAndZoomIntoView([sectionNode]);
  });
}

export async function createEventStickyNote(msg: EventMessage) {
  const sticky = figma.createSticky();
  await figma.loadFontAsync(sticky.text.fontName as FontName);
  sticky.fills = [{ type: 'SOLID', color: ORANGE_COLOR }];
  sticky.text.fontSize = 16;

  let content = `${msg.eventName}\n---------\n`;
  msg.properties.forEach((property) => {
    content += `${property.name}: ${property.type}\n`;
  });

  sticky.text.characters = content;
  return sticky;
}