import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { deleteProductAction } from "@/app/actions";

type DeleteProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DeleteProductPage({
  params,
}: DeleteProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const deleteAction = deleteProductAction.bind(null, product.id);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-10">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3h.008v.008H12v-.008ZM3.75 19.5h16.5L12 4.5l-8.25 15Z" />
          </svg>
        </div>
        <h1 className="text-center text-2xl font-bold tracking-tight text-slate-900">
          ยืนยันการลบสินค้า
        </h1>
        <p className="mt-3 text-center leading-7 text-slate-600">
          ต้องการลบสินค้า <span className="font-semibold text-slate-900">“{product.name}”</span> หรือไม่?
        </p>
        <p className="mt-2 text-center text-sm text-red-600">
          การดำเนินการนี้ไม่สามารถย้อนกลับได้
        </p>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            ยกเลิก
          </Link>
          <form action={deleteAction}>
            <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto">
              ยืนยันการลบ
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}