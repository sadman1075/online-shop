/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import AosWrapper from "@/components/AosWrapper";

export default async function ProductsPage() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const products = await res.json();

  return (
    <AosWrapper>
      <div className="max-w-7xl mx-auto mt-10 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 ">
          {products.map((product: any) => (
            <Card 
            data-aos="zoom-in-up"
              key={product.id}
              className="relative mx-auto w-full max-w-sm pt-0 rounded-2xl shadow-xl group  border border-gray-200 overflow-hidden
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:shadow-xl"
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                width={500}
                height={500}
                className="relative z-20 border-4 border-white rounded-2xl w-full  h-64  object-cover hover:scale-105 transition-transform duration-300 ease-out group-hover:scale-110"
              />
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardFooter>
                <div className="m-2">
                  <Link href={"#"}>
                    <Button className="w-full text-sm mx-auto">
                      View Product - ${product.price}
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AosWrapper>
  );
}