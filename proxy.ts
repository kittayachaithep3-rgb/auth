import { auth } from "@/auth";

export const proxy = auth((req: any) => {
  // ปกป้องเส้นทางตามที่กำหนดใน config matcher
});

export const config = {
  matcher: ["/products/:id/edit", "/products/:id/delete"],
};