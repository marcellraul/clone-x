import { AuthButtonServer } from "../components/auth-button-server";

export default function Login() {
  return (
    <section className="max-w-md mx-auto mt-10 p-6 bg-dark rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Inicia session en Clone-X</h1>
      <AuthButtonServer />
    </section>
  );
}
