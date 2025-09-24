import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";

export default async function DashboardPage() {
    const token = (await cookies()).get("session")?.value ?? "";
    const session = verifySession(token)!; // safe thanks to middleware

    return (
        <main className="max-w-3xl mx-auto p-6 space-y-3">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-600">
                Signed in as <b>{session.email}</b>
            </p>
            <form action="/api/logout" method="POST">
                <button className="border rounded-md px-3 py-2">Log out</button>
            </form>
        </main>
    );
}
