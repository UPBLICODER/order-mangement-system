import { Card, Button } from "../../ui";
import { useState } from "react";

export default function NotesSection({ initialNotes = [] }) {
  const [notes, setNotes] = useState("");
  const [list, setList] = useState(
    initialNotes.map((n) => ({
      text: n,
      time: "Earlier",
    })),
  );

  const addNote = () => {
    if (!notes.trim()) return;

    setList([{ text: notes, time: "Just now" }, ...list]);
    setNotes("");
  };

  return (
    <Card className="space-y-4">
      <h2 className="text-sm text-gray-400">Notes / Remarks</h2>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add note..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
        <Button onClick={addNote}>Add</Button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {list.length === 0 && (
          <p className="text-xs text-gray-500">No notes yet</p>
        )}

        {list.map((note, i) => (
          <div
            key={i}
            className="bg-white/5 hover:bg-white/10 transition-all duration-200 p-3 rounded-xl text-sm flex justify-between"
          >
            <span>{note.text}</span>
            <span className="text-xs text-gray-500">{note.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
