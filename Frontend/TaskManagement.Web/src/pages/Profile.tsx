import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { authService } from "../services/authService";
import type { User } from "../types/user";

export function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    authService.getProfile().then(setUser);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 className="mt-5 mb-3">Profile</h2>
      <Card
        style={{
          backgroundColor: "var(--surface-card)",
          borderRadius: "15px",
        }}
      >
        <div className="flex flex-column gap-3 text-center">
          <div>
            <div className="font-bold mb-1">Username</div>
            <p>{user.username}</p>
          </div>
          <div>
            <div className="font-bold mt-3 mb-1">Email</div>
            <p>{user.email}</p>
          </div>
          <div>
            <div className="font-bold mt-3 mb-1">First Name</div>
            <p>{user.firstName}</p>
          </div>
          <div>
            <div className="font-bold mt-3 mb-1">Last Name</div>
            <p>{user.lastName}</p>
          </div>
          <div>
            <div className="font-bold mt-2 mb-1">Created At</div>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
