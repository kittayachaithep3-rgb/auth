import Link from "next/link";
import { auth } from "@/auth";
import { getProducts } from "@/lib/products";
import { AuthButtons } from "./auth-buttons";

export default async function HomePage() {
  const session = await auth();
  const products = getProducts();
  const isLoggedIn = Boolean(session?.user);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 24px",
        background: "linear-gradient(145deg, #f0f9ff 0%, #f8fafc 48%, #f5f3ff 100%)",
        color: "#172554",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 36,
          padding: "28px 32px",
          border: "1px solid #e2e8f0",
          borderRadius: 24,
          background: "rgba(255, 255, 255, 0.88)",
          boxShadow: "0 16px 40px rgba(30, 64, 175, 0.08)",
        }}
      >
        <div>
          <p style={{ margin: "0 0 6px", color: "#6366f1", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em" }}>
            PRODUCT COLLECTION
          </p>
          <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.2, letterSpacing: "-0.04em" }}>สินค้า</h1>
          <p style={{ margin: "8px 0 0", color: "#64748b" }}>เลือกชมสินค้าที่คุณชื่นชอบ</p>
        </div>
        <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
      </header>

      <section
        aria-label="รายการสินค้า"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}
      >
        {products.map((product) => (
          <article
            key={product.id}
            data-testid="product"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: 210,
              padding: 24,
              border: "1px solid #e2e8f0",
              borderRadius: 20,
              background: "#fff",
              boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
            }}
          >
            <h2 style={{ margin: "0 0 10px", color: "#1e293b", fontSize: 20 }}>{product.name}</h2>
            <p style={{ margin: "0 0 20px", color: "#64748b", lineHeight: 1.65 }}>{product.description}</p>
            <p style={{ margin: "auto 0 0", color: "#4f46e5", fontSize: 22, fontWeight: 750 }}>
              ฿{product.price.toLocaleString("th-TH")}
            </p>
            {isLoggedIn && (
              <div style={{ display: "flex", gap: 10, marginTop: 18, paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
                <Link
                  href={`/products/${product.id}/edit`}
                  style={{ color: "#4338ca", fontWeight: 600, textDecoration: "none" }}
                >
                  แก้ไข
                </Link>
                <Link
                  href={`/products/${product.id}/delete`}
                  style={{ color: "#dc2626", fontWeight: 600, textDecoration: "none" }}
                >
                  ลบ
                </Link>
              </div>
            )}
          </article>
        ))}
        {products.length === 0 && (
          <p style={{ gridColumn: "1 / -1", margin: 0, padding: 48, borderRadius: 20, background: "#fff", color: "#64748b", textAlign: "center" }}>
            ไม่มีสินค้า
          </p>
        )}
      </section>
      </div>
    </main>
  );
}