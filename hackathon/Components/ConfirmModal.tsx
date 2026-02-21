"use client";

type ConfirmModalProps = {
  open: boolean;
  onAnswer: (answer: boolean) => void;
};

export default function ConfirmModal({ open, onAnswer }: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75">
      <div className="bg-black p-8 rounded shadow text-white">
        <p>Are you sure?</p>

        <div className="mt-4 flex gap-4">
          <button
            onClick={() => onAnswer(false)}
            className="bg-red-600 text-white px-4 py-3 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onAnswer(true)}
            className="bg-green-700 text-white px-4 py-3 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}