import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { updateProductAction } from "@/app/actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const updateAction = updateProductAction.bind(null, product.id);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600">
            <span aria-hidden="true">←</span> กลับหน้ารายการสินค้า
          </Link>
          <p className="mb-2 text-sm font-semibold tracking-wide text-indigo-600">จัดการสินค้า</p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">แก้ไขสินค้า</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">ปรับปรุงรายละเอียดสินค้าแล้วกดบันทึก</p>
        </header>
        <form
          action={updateAction}
          className="space-y-6 rounded-2xl border border-white bg-white p-6 shadow-xl shadow-indigo-900/5 ring-1 ring-gray-900/5 sm:p-8"
        >
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800">ชื่อสินค้า</label>
          <input
            id="name"
            name="name"
            defaultValue={product.name}
            required
            placeholder="ระบุชื่อสินค้า"
            className="block w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-semibold text-gray-800">ราคา</label>
          <div className="relative">
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={product.price}
              required
              className="block w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 pr-14 text-gray-900 outline-none transition hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-gray-400">บาท</span>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-800">รายละเอียด</label>
          <textarea
            id="description"
            name="description"
            defaultValue={product.description}
            required
            rows={5}
            placeholder="อธิบายรายละเอียดสินค้า"
            className="block w-full resize-y rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            ยกเลิก
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            บันทึกการเปลี่ยนแปลง
          </button>
        </div>
        </form>
      </div>
    </main>
  );
}