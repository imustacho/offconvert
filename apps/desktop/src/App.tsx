import { QueueView } from "./features/queue/QueueView";
import { ConvertView } from "./features/convert/ConvertView";
import { Sidebar } from "./components/Sidebar";

export function App() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-ink">
      <Sidebar />
      <main className="grid flex-1 gap-6 p-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ConvertView />
        <QueueView />
      </main>
    </div>
  );
}

