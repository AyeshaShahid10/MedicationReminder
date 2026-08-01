import { ThemeProvider } from "./context/ThemeContext";
import { ReminderProvider } from "./context/ReminderContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ReminderProvider>{children}</ReminderProvider>
    </ThemeProvider>
  );
}
