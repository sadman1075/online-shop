/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 12;

export default function UsersTable() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err:any) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedData = products.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full rounded-2xl border bg-white shadow-sm  overflow-x-auto m-10">
      {/* Loading */}
      {loading && (
        <div className="py-10 text-center text-muted-foreground">
          Loading products...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="py-10 text-center text-red-500">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <>
          <Table >
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="px-6">Product</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((product:any) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-gray-50 transition"
                >
                  <TableCell className="px-6 font-medium">
                    {product.title}
                  </TableCell>
                  <TableCell className="max-w-lg truncate">
                    {product.description}
                  </TableCell>
                  <TableCell>
                    {product.category?.name ?? "N/A"}
                  </TableCell>
                  <TableCell>
                    $ {product.price}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.price > 50 ? "default" : "secondary"}>
                      {product.price > 50 ? "Premium" : "Standard"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}

              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={page === i + 1 ? "default" : "outline"}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                size="sm"
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}