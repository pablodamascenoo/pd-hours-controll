import Users from "@/components/Users";

export default function Usersage() {
  return (
    <main className={`bg-gray-1 flex min-h-screen flex-col text-base-black`}>
      {/* @ts-expect-error Server Component */}
      <Users />
    </main>
  );
}
