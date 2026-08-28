import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import { attachmentService } from "../services/attachmentService";
import { AttachmentCard } from "./AttachmentCard";
import { AttachmentForm } from "./AttachmentForm";
import type { TaskAttachment } from "../types/attachment";

interface AttachmentsSectionProps {
  taskId: string;
}

export function AttachmentsSection({ taskId }: AttachmentsSectionProps) {
  const [attachments, setAttachments] = useState<TaskAttachment[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const toast = useRef<Toast>(null);

  const loadAttachments = () => {
    attachmentService.getAll(taskId).then(setAttachments);
  };

  useEffect(() => {
    loadAttachments();
  }, [taskId]);

  const openCreate = () => {
    setFormVisible(true);
  };

  const handleSaved = () => {
    setFormVisible(false);
    loadAttachments();
    toast.current?.show({ severity: "success", summary: "File uploaded" });
  };

  const confirmDelete = (attachment: TaskAttachment) => {
    confirmDialog({
      message: `Delete file?`,
      style: { width: "25rem" },
      accept: async () => {
        await attachmentService.delete(taskId, attachment.id);
        loadAttachments();
        toast.current?.show({ severity: "success", summary: "File deleted." });
      },
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Attachments</h3>
        <Button label="Add Attachment" icon="pi pi-plus" onClick={openCreate} />
      </div>

      {attachments.length === 0 ? (
        <p className="text-color-secondary text-sm text-left">
          No attachments.
        </p>
      ) : (
        <div className="flex flex-column gap-3">
          {attachments.map((attachment) => (
            <AttachmentCard
              key={attachment.id}
              attachment={attachment}
              onDelete={confirmDelete}
            />
          ))}
        </div>
      )}

      <AttachmentForm
        visible={formVisible}
        taskId={taskId}
        onHide={() => setFormVisible(false)}
        onSaved={handleSaved}
      />
    </div>
  );
}
