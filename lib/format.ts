const priceFormat = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
});
export function formatPrice(price: number): string {
    return priceFormat.format(price);
}
