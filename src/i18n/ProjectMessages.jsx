import { MessagesContext } from './contexts';
import en from './locales/projects.en';
import es from './locales/projects.es';
const messages = { en, es };
export default function ProjectMessages({ children }) {
  return <MessagesContext value={messages}>{children}</MessagesContext>;
}
