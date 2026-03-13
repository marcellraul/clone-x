import { supabaseClient } from "@/lib/supabaseClient";
import { AuthButtonServer } from "./components/auth-button-server";
import { redirect } from "next/navigation";
import { HeroUITest } from "./components/heroui-test";

export default async function Home() {
  const supabase = await supabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: posts } = await supabase.from("posts").select("*, users(*)");
  if (session === null) {
    redirect("/login");
  }
  const people = [
    {
      name: "Calvin Hawkins",
      email: "calvin.hawkins@example.com",
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Kristen Ramos",
      email: "kristen.ramos@example.com",
      image:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Ted Fox",
      email: "ted.fox@example.com",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Hola Clone-X</h1>

        <HeroUITest />

        <AuthButtonServer />

        <ul className="divide-y divide-gray-200">
          hola
          {people.map((person) => (
            <li key={person.email} className="flex py-4">
              <img className="size-10 rounded-full" src={person.image} alt="" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {person.name}
                </p>
                <p className="text-sm text-gray-500">{person.email}</p>
              </div>
            </li>
          ))}
        </ul>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </main>
    </div>
  );
}
