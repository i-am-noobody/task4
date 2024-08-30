import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <main>


    <div className="flex flex-row gap-[2rem] items-center justify-center">
    <Link href="/login">Login</Link>
    <Link href="/signup">Signup</Link>
    <Link href="/dashboard">Dashboard</Link>
    </div>
   </main>
  );
}
