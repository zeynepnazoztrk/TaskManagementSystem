import { Card } from "primereact/card";
import { Button } from "primereact/button";
import type { TaskAttachment } from "../types/attachment";

interface AttachmentCardProps {
  attachment: TaskAttachment;
  onDelete: (attachment: TaskAttachment) => void;
}

export function AttachmentCard({ attachment, onDelete }: AttachmentCardProps) {
  return (
    <Card style={{ backgroundColor: "var(--surface-c)" }}>
      <div className="flex justify-content-between align-items-start gap-2 text-left">
        <p>{attachment.fileName}</p>
        <Button label="Delete" text onClick={() => onDelete(attachment)} />
      </div>
    </Card>
  );
}
