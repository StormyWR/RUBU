
import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BellRing } from "lucide-react";

interface BulletinNote {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'update' | 'news' | 'event';
}

const bulletinNotes: BulletinNote[] = [
  {
    id: '1',
    title: 'Weekly Wipe Tomorrow!',
    content: 'Get ready for our weekly wipe! Join early for special starter kits.',
    date: '2024-01-18',
    type: 'event'
  },
  {
    id: '2',
    title: 'New VIP Features',
    content: 'Check out the latest VIP perks in our store.',
    date: '2024-01-17',
    type: 'news'
  },
  {
    id: '3',
    title: 'Anti-Cheat Update',
    content: "We've improved our anti-cheat system for better protection.",
    date: '2024-01-16',
    type: 'update'
  }
];

export function BulletinBoard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-dark-light/30 border-primary/30 hover:border-primary/60">
          <BellRing className="h-4 w-4 mr-2 text-primary" />
          Burrow Bulletin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-8 border-2 border-[#654321] bg-cover bg-center" style={{ backgroundImage: "url('/images/bulletin-bg.jpg')" }}>
        <div className="relative">
          <h2 className="font-heading text-3xl text-primary mb-6 text-center">The Burrow Bulletin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bulletinNotes.map((note) => (
              <motion.div
                key={note.id}
                className="bg-[#FDFFA9] p-4 rounded shadow-lg transform rotate-[-1deg] hover:rotate-0 transition-transform cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full" />
                </div>
                <h3 className="font-bold text-dark mb-2">{note.title}</h3>
                <p className="text-sm text-dark-light">{note.content}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-dark-light/70">{note.date}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    note.type === 'event' ? 'bg-primary/20 text-primary' :
                    note.type === 'news' ? 'bg-secondary/20 text-secondary' :
                    'bg-accent/20 text-accent'
                  }`}>
                    {note.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
