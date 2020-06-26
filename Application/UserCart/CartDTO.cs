using System;
using System.Collections.Generic;
using Domain;

namespace Application.UserCart {
    public class CartDTO {
        public Guid Id { get; set; }
        public ICollection<CartItemDTO> ItemsInCart { get; set; }
        public AppUser AppUser { get; set; }
        public float Total { get; set; }
    }
}