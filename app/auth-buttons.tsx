import { signIn, signOut } from "@/auth";

type AuthButtonsProps = {
  isLoggedIn: boolean;
  userName?: string | null;
};

export function AuthButtons({ isLoggedIn, userName }: AuthButtonsProps) {
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
        <span className="text-sm text-gray-600">
          สวัสดี <strong className="font-semibold text-gray-900">{userName ?? "ผู้ใช้งาน"}</strong>
        </span>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </form>
      </div>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
      >
        Login with Google
      </button>
    </form>
  );
}