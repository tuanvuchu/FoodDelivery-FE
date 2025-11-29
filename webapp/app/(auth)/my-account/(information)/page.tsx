import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./account-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Tài khoản</h3>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
