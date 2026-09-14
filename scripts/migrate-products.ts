import prisma from "../prisma";
import products from "../src/data/products.json";

async function migrateProducts() {
  console.log("Starting product migration...");

  try {
    for (const product of products) {
      await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          image: product.image,
          images: product.images || [], // MongoDB will handle this as JSON
          description: product.description,
          features: product.features || [], // MongoDB will handle this as JSON
          category: product.category,
          sizes: product.sizes || [], // MongoDB will handle this as JSON
          isNew: product.isNew || false,
          isBestseller: product.isBestseller || false,
          reviews: product.reviews || null,
          stock: 100, // Default stock
          status: "active",
        },
      });
      console.log(`Migrated product: ${product.name}`);
    }

    console.log("Product migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
    throw error;
  }
}

// Run the migration
migrateProducts()
  .then(() => {
    console.log("Migration completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });
