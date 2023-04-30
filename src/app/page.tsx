import Squads from "@/components/Squads";
export const revalidate = 0;
export default function SquadPage() {
  return (
    <main className={`bg-gray-1 flex min-h-screen flex-col text-base-black`}>
      {/* @ts-expect-error Server Component */}
      <Squads />
    </main>
  );
}
