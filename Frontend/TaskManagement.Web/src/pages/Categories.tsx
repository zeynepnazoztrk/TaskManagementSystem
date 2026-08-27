import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { categoryService } from "../services/categoryService";
import { CategoryCard } from "../components/CategoryCard";
import { CategoryForm } from "../components/CategoryForm";
import type { Category } from "../types/category";
import { Toast } from "primereact/toast";

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const toast = useRef<Toast>(null);

  const handleSaved = () => {
    const wasEditing = Boolean(editingCategory);
    setFormVisible(false);
    loadCategories();
    toast.current?.show({
      severity: "success",
      summary: wasEditing ? "Category updated." : "Category created.",
    });
  };

  const loadCategories = () => {
    categoryService.getAll().then(setCategories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreate = () => {
    setEditingCategory(null);
    setFormVisible(true);
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    setFormVisible(true);
  };

  const confirmDelete = (category: Category) => {
    confirmDialog({
      message: `Delete "${category.name}"?`,
      style: { width: "25rem" },
      accept: async () => {
        await categoryService.delete(category.id);
        loadCategories();
        toast.current?.show({
          severity: "success",
          summary: "Category deleted.",
        });
      },
    });
  };

  const rows: Category[][] = [];
  for (let i = 0; i < categories.length; i += 2) {
    rows.push(categories.slice(i, i + 2));
  }

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="flex justify-content-between align-items-center mb-4">
        <h1></h1>
        <Button label="Add Category" icon="pi pi-plus" onClick={openCreate} />
      </div>
      <div className="flex flex-column gap-4">
        {rows.map((row, i) => (
          <div key={i} className="flex flex-column lg:flex-row gap-4">
            {row.map((category) => (
              <div key={category.id} className="md:flex-1">
                <CategoryCard
                  category={category}
                  onEdit={openEdit}
                  onDelete={confirmDelete}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <CategoryForm
        visible={formVisible}
        category={editingCategory}
        onHide={() => setFormVisible(false)}
        onSaved={handleSaved}
      />
    </div>
  );
}
