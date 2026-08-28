import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { attachmentService } from "../services/attachmentService";
import { FileUpload } from "primereact/fileupload";
import type { FileUploadSelectEvent } from "primereact/fileupload";

interface AttachmentFormProps {
  visible: boolean;
  taskId: string;
  onHide: () => void;
  onSaved: () => void;
}

export function AttachmentForm({
  visible,
  taskId,
  onHide,
  onSaved,
}: AttachmentFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleSelect = (e: FileUploadSelectEvent) => {
    setFile(e.files[0]);
    setError("");
  };

  const onSubmit = async () => {
    if (!file) {
      setError("File is required.");
      return;
    }
    await attachmentService.upload(taskId, file);
    setFile(null);
    onSaved();
  };

  return (
    <Dialog
      header="Add Attachment"
      visible={visible}
      onHide={onHide}
      style={{ width: "25rem" }}
    >
      <div className="flex flex-column gap-4 mt-3">
        <FileUpload
          key={String(visible)}
          mode="basic"
          chooseLabel="Choose File"
          auto={false}
          onSelect={handleSelect}
        />
        {error && <small className="p-error block mt-1">{error}</small>}
        <div className="flex justify-content-end gap-2">
          <Button label="Save" onClick={onSubmit} />
        </div>
      </div>
    </Dialog>
  );
}
