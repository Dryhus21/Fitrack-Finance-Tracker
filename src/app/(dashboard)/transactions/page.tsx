import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Topbar } from "@/components/dashboard/Topbar";
import { TransactionManager } from "@/components/transactions/TransactionManager";

export default async function TransactionsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <>
      <Topbar title="Transaksi" subtitle="Riwayat dan pengelolaan pengeluaran" />
      <div className="px-4 sm:px-5 md:px-8 py-5 md:py-6 max-w-7xl">
        <TransactionManager />
      </div>
    </>
  );
}
