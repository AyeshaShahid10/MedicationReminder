import ReminderCard from "../components/ReminderCard";
import EmptyState from "../components/EmptyState";
import{ MOCK_REMINDERS} from "../mock/Reminders";


export default function Dashboard() {
  const reminders = MOCK_REMINDERS; // static for Day 3

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
       <div class="px-6 py-6">
  <h1 class="text-2xl font-semibold">Welcome, User</h1>
  <p class="text-gray-500 mt-1">Here are your upcoming reminders</p>
</div>

      </header>

      {reminders.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reminders.map(r => (
            <ReminderCard key={r.id} {...r} onDelete={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
