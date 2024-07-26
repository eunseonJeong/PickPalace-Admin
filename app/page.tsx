"use client";

import {Modal} from "@/components/modal";

export default function Home() {
  return (
      <main className="h-full bg-slate-200 p-2">
        <Modal
            title="Test"
            description="Test Description"
            isOpen={true}
            onClose={() => {
            }}
        >
          Modal Content
        </Modal>
      </main>
  );
}
