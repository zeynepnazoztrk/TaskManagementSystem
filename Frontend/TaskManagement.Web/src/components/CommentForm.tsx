import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { commentService } from "../services/commentService";

interface CommentFormValues {
  comment: string;
}

interface CommentFormProps {
  visible: boolean;
  taskId: string;
  onHide: () => void;
  onSaved: () => void;
}

const emptyValues: CommentFormValues = { comment: "" };

export function CommentForm({
  visible,
  taskId,
  onHide,
  onSaved,
}: CommentFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({ defaultValues: emptyValues });

  useEffect(() => {
    if (visible) {
      reset(emptyValues);
    }
  }, [visible, reset]);

  const onSubmit = async (data: CommentFormValues) => {
    await commentService.create(taskId, { comment: data.comment });
    onSaved();
  };

  return (
    <Dialog
      header="Add Comment"
      visible={visible}
      onHide={onHide}
      style={{ width: "30rem" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-column gap-4 mt-3"
      >
        <Controller
          name="comment"
          control={control}
          rules={{ required: "Comment is required" }}
          render={({ field }) => (
            <InputTextarea
              placeholder="Comment"
              rows={3}
              className="w-full"
              {...field}
            />
          )}
        />
        {errors.comment && (
          <small className="p-error block mt-1">{errors.comment.message}</small>
        )}
        <div className="flex justify-content-end gap-2">
          <Button type="submit" label="Save" />
        </div>
      </form>
    </Dialog>
  );
}
