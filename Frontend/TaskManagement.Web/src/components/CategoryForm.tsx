import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ColorPicker } from "primereact/colorpicker";
import { Button } from "primereact/button";
import { categoryService } from "../services/categoryService";
import type {
  Category,
  CreateCategory,
  UpdateCategory,
} from "../types/category";

interface CategoryFormValues {
  name: string;
  description: string;
  color: string;
}

interface CategoryFormProps {
  visible: boolean;
  category: Category | null;
  onHide: () => void;
  onSaved: () => void;
}

const emptyValues: CategoryFormValues = {
  name: "",
  description: "",
  color: "4960a4",
};

export function CategoryForm({
  visible,
  category,
  onHide,
  onSaved,
}: CategoryFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({ defaultValues: emptyValues });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description ?? "",
        color: category.color.replace("#", ""),
      });
    } else {
      reset(emptyValues);
    }
  }, [category, reset]);

  const onSubmit = async (data: CategoryFormValues) => {
    const basePayload = {
      name: data.name,
      description: data.description,
      color: `#${data.color}`,
    };
    if (category) {
      await categoryService.update(category.id, basePayload as UpdateCategory);
    } else {
      await categoryService.create(basePayload as CreateCategory);
    }
    onSaved();
  };

  return (
    <Dialog
      header={category ? "Edit Category" : "Add Category"}
      visible={visible}
      onHide={onHide}
      style={{ width: "30rem" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-column gap-4 mt-3"
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <InputText
              placeholder="Category name"
              className="w-full"
              {...field}
            />
          )}
        />
        {errors.name && (
          <small className="p-error block mt-1">{errors.name.message}</small>
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
        <div className="flex align-items-center gap-3">
          <span>Color</span>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorPicker
                value={field.value}
                onChange={(e) => field.onChange(e.value as string)}
              />
            )}
          />
        </div>
        <div className="flex justify-content-end gap-2">
          <Button type="submit" label="Save" />
        </div>
      </form>
    </Dialog>
  );
}
