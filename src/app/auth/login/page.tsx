import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./ui/LoginForm";

export default async function LogInPage() {

  const session = await auth();

  if ( session?.user ) {
    redirect('/');
  }

  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className="text-center text-xl font-semibold mb-6">Accede a tu cuenta.</h1>
      <LoginForm/>
    </div>
  );
}
