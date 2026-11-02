import { Product } from "../data/mockData";

const columns: Array<{ header: string; value: (product: Product) => string | number | boolean }> = [
    { header: "Product ID", value: (product) => product.id },
    { header: "Slug", value: (product) => product.slug },
    { header: "Name", value: (product) => product.name },
    { header: "Category", value: (product) => product.category },
    { header: "Category Slug", value: (product) => product.categorySlug },
    { header: "Price (INR)", value: (product) => product.price },
    { header: "MRP (INR)", value: (product) => product.mrp },
    { header: "Stock", value: (product) => product.stock },
    { header: "Variants", value: (product) => JSON.stringify(product.variants ?? []) },
    { header: "Rating", value: (product) => product.rating },
    { header: "Review Count", value: (product) => product.reviewCount },
    { header: "Short Description", value: (product) => product.shortDescription },
    { header: "Description", value: (product) => product.description },
    { header: "Ingredients", value: (product) => product.ingredients },
    { header: "How To Use", value: (product) => product.howToUse },
    { header: "Organic", value: (product) => product.isOrganic },
    { header: "Bestseller", value: (product) => product.isBestseller },
    { header: "Featured", value: (product) => product.isFeatured },
    { header: "Image Theme", value: (product) => product.imageTheme },
    { header: "Kit Contents", value: (product) => JSON.stringify(product.kitContents ?? []) },
    { header: "Visibility", value: (product) => product.active === false ? "Hidden" : "Active" },
];

function escapeCsvCell(value: string | number | boolean): string {
    let text = String(value ?? "");
    if (typeof value === "string" && /^[\u0000-\u0020]*[=+\-@]/.test(value)) {
        text = `'${text}`;
    }
    return `"${text.replace(/"/g, '""')}"`;
}

export function productsToCsv(products: Product[]): string {
    const header = columns.map(({ header }) => escapeCsvCell(header)).join(",");
    const rows = products.map((product) =>
        columns.map(({ value }) => escapeCsvCell(value(product))).join(",")
    );
    return `\uFEFF${[header, ...rows].join("\r\n")}`;
}

export function downloadProductsCsv(products: Product[]): void {
    const blob = new Blob([productsToCsv(products)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `femora-products-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}