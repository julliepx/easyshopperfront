"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ShoppingCart, LogOut, LogIn, UserPlus } from "lucide-react";

export function Navbar() {
  const { logout, isAuthenticated } = useAuth();

  return (
    <header className="flex justify-between items-center h-16 px-8 bg-white">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Easy Shopper
      </Link>
      <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
        <Link
          href="/products"
          className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
        >
          <ShoppingCart size={18} />
          Products
        </Link>
      </div>
      <div className="flex items-center">
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <LogIn size={18} />
              Login
            </Link>
            <Link
              href="/register"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <UserPlus size={18} />
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
