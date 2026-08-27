import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { taskService } from "../services/taskService";
import { categoryService } from "../services/categoryService";
import { Priority, TaskStatus } from "../types/enums";
import { priorityOptions, statusOptions } from "../utils/taskTags";
import type { TaskItem, CreateTask, UpdateTask } from "../types/task";
import type { Category } from "../types/category";

interface TaskFormValues {
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: Date | null;
  categoryId: string | null;
}

interface TaskFormProps {
  visible: boolean;
  task: TaskItem | null;
  onHide: () => void;
  onSaved: () => void;
}

const emptyValues: TaskFormValues = {
  title: "",
  description: "",
  priority: Priority.Normal,
  status: TaskStatus.Pending,
  dueDate: null,
  categoryId: null,
};

export function TaskForm({ visible, task, onHide, onSaved }: TaskFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: emptyValues,
  });

  useEffect(() => {
    categoryService.getAll().then(setCategories);
  }, []);

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description ?? "",
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        categoryId: task.categoryId ?? null,
      });
    } else {
      reset(emptyValues);
    }
  }, [task, visible, reset]);

  const onSubmit = async (data: TaskFormValues) => {
    const basePayload = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate ? data.dueDate.toISOString() : undefined,
    };
    if (task) {
      await taskService.update(task.id, {
        ...basePayload,
        status: data.status,
        categoryId: data.categoryId ?? "00000000-0000-0000-0000-000000000000",
      } as UpdateTask);
    } else {
      await taskService.create({
        ...basePayload,
        categoryId: data.categoryId ?? undefined,
      } as CreateTask);
    }
    onSaved();
  };

  return (
    <Dialog
      header={task ? "Edit Task" : "Add Task"}
      visible={visible}
      onHide={onHide}
      style={{ width: "30rem" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-column gap-4 mt-3"
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <InputText placeholder="Title" className="w-full" {...field} />
          )}
        />
        {errors.title && (
          <small className="p-error block mt-1">{errors.title.message}</small>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <InputTextarea
              placeholder="Description"
              rows={3}
              className="w-full"
              {...field}
            />
          )}
        />
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder="Priority"
              options={priorityOptions}
              className="w-full"
              {...field}
            />
          )}
        />
        {task && (
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder="Status"
                options={statusOptions}
                className="w-full"
                {...field}
              />
            )}
          />
        )}
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <Calendar placeholder="Due date" className="w-full" {...field} />
          )}
        />
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder="Category (optional)"
              options={categories.map((c) => ({ label: c.name, value: c.id }))}
              className="w-full"
              showClear
              value={field.value}
              onChange={(e) => field.onChange(e.value ?? null)}
            />
          )}
        />
        <div className="flex justify-content-end gap-2">
          <Button type="submit" label="Save" />
        </div>
      </form>
    </Dialog>
  );
}
