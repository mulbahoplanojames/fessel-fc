"use client";

import { Filter, Grid3X3, GridIcon, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/product-card";
import products from "@/data/products.json";
import { useMemo, useState } from "react";

export default function ShopPage() {
  const [filterCriteria, setFilterCriteria] = useState({
    category: "",
    priceRange: "",
    isNew: false,
    isBestseller: false,
  });
  const [tabValue, setTabValue] = useState("all");

  const handleFilterChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    setFilterCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatch =
        filterCriteria.category === "" ||
        product.category === filterCriteria.category;
      const priceRangeMatch =
        filterCriteria.priceRange === "" ||
        (product.price >= 25 && product.price <= 50);
      const isNewMatch =
        filterCriteria.isNew === false || product.isNew === true;
      const isBestsellerMatch =
        filterCriteria.isBestseller === false || product.isBestseller === true;
      const tabMatch =
        tabValue === "all" ||
        (tabValue === "new" && product.isNew) ||
        (tabValue === "bestsellers" && product.isBestseller) ||
        (tabValue === "sale" && product.price < 50);

      return (
        categoryMatch &&
        priceRangeMatch &&
        isNewMatch &&
        isBestsellerMatch &&
        tabMatch
      );
    });

    return filtered;
  }, [filterCriteria, tabValue]);

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Official FC Fassell Shop
          </h1>
          <p className="text-muted-foreground">
            Get the latest FC Fassell merchandise and show your support for the
            team
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <GridIcon className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Compact view</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 space-y-6">
          <div>
            <h3 className="font-medium mb-4 flex items-center justify-between">
              Categories
              <Button variant="ghost" size="sm" className="h-8 px-2 lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </h3>
            <div className="space-y-1">
              {[
                { label: "All Products", value: "" },
                { label: "Kits", value: "kits" },
                { label: "Training Wear", value: "training" },
                { label: "Clothing", value: "clothing" },
                { label: "Accessories", value: "accessories" },
                { label: "Equipment", value: "equipment" },
                { label: "Souvenirs", value: "souvenirs" },
              ].map((category) => (
                <Button
                  key={category.label}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() =>
                    handleFilterChange({
                      target: { name: "category", value: category.value },
                    })
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setTabValue("all")}>
                All Products
              </TabsTrigger>
              <TabsTrigger value="new" onClick={() => setTabValue("new")}>
                New Arrivals
              </TabsTrigger>
              <TabsTrigger
                value="bestsellers"
                onClick={() => setTabValue("bestsellers")}
              >
                Bestsellers
              </TabsTrigger>
              <TabsTrigger value="sale" onClick={() => setTabValue("sale")}>
                Sale
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="rounded-full">
              Load More Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
