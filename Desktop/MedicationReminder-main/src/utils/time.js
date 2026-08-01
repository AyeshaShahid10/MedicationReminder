// Small, dependency-free time helpers used throughout the app.
// Times are stored internally as 24-hour "HH:MM" strings so they sort
// and compare naturally; the UI converts to 12-hour format for display.

export function pad(n) {
  return String(n).padStart(2, "0");
}

export function to24Hour(hour12, minute, ampm) {
  let h = parseInt(hour12, 10) % 12;
  if (ampm === "PM") h += 12;
  return `${pad(h)}:${pad(parseInt(minute, 10))}`;
}

export function from24Hour(time24) {
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return { hour: pad(h), minute: mStr, ampm };
}

export function formatTime(time24) {
  const { hour, minute, ampm } = from24Hour(time24);
  return `${hour}:${minute} ${ampm}`;
}

export function todayISO(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function nowTime24() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}

export function dayOfWeek(d = new Date()) {
  return d.getDay(); // 0 = Sun ... 6 = Sat
}

/** Is this reminder scheduled to happen on the given date? */
export function isReminderActiveOn(reminder, date = new Date()) {
  switch (reminder.frequency) {
    case "daily":
      return true;
    case "weekly":
      return (reminder.days || []).includes(dayOfWeek(date));
    case "once":
      return reminder.date === todayISO(date);
    default:
      return true;
  }
}
