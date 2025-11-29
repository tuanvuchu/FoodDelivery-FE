import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";

export default function Profile() {
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Thông tin cá nhân</h3>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
