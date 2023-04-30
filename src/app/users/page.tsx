import Users from "@/components/Users";
export const revalidate = 0;
export default function UsersPage() {
  return (
    <main className={`bg-gray-1 flex min-h-screen flex-col text-base-black`}>
      {/* @ts-expect-error Server Component */}
      <Users />
    </main>
  );
}
