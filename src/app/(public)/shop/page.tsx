"use client";

import {
  Filter,
  Grid3X3,
  GridIcon,
  SlidersHorizontal,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/product-card";
import { useMemo, useState } from "react";
import { Product } from "@/types/product-type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ShopPage() {
  const [filterCriteria, setFilterCriteria] = useState({
    category: "",
    priceRange: "",
    isNew: false,
    isBestseller: false,
  });
  const [tabValue, setTabValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("featured");

  // Fetch products from API
  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ["products", filterCriteria.category, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterCriteria.category) params.append("category", filterCriteria.category);
      if (searchQuery) params.append("search", searchQuery);
      if (filterCriteria.isNew) params.append("isNew", "true");
      if (filterCriteria.isBestseller) params.append("isBestseller", "true");
      
      const response = await axios.get(`/api/products?${params.toString()}`);
      return response.data.products;
    },
  });

  const products = useMemo(() => productsData || [], [productsData]);

  const handleFilterChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    setFilterCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const query = searchQuery.trim().toLowerCase();
    const filtered = products.filter((product: Product) => {
      const searchMatch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
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
        searchMatch &&
        categoryMatch &&
        priceRangeMatch &&
        isNewMatch &&
        isBestsellerMatch &&
        tabMatch
      );
    });

    switch (sortValue) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [filterCriteria, tabValue, searchQuery, sortValue, products]);

  if (isLoading) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-clr mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">Error loading products</h2>
          <p className="text-muted-foreground mb-4">
            Failed to load products. Please try again later.
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!isLoading && (!products || products.length === 0)) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">No products available</h2>
          <p className="text-muted-foreground">
            Check back later for new merchandise.
          </p>
        </div>
      </div>
    );
  }

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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[180px] md:w-[220px] pl-9 pr-8"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Select value={sortValue} onValueChange={setSortValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
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

          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <Button variant="outline" className="rounded-full">
                  Load More Products
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                No products found with the current filter.
              </h2>
              <p className="mb-8">
                Try adjusting your filter or search query to find the product
                you are looking for.
              </p>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  handleFilterChange({
                    target: { name: "category", value: "" },
                  });
                  setSearchQuery("");
                  setTabValue("all");
                }}
              >
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
