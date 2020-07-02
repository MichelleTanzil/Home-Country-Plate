using System;

namespace Domain {
    public class CartItem {
        public int Id { get; set; }
        public Guid ProductId { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public float Price { get; set; }
        public int quantity { get; set; }
    }
}