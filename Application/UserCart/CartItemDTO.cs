using Application.Products;

namespace Application.UserCart {
    public class CartItemDTO {
        public ProductDto product { get; set; }
        public int quantity { get; set; }
    }
}