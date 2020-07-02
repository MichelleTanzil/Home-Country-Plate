using System;
using System.Collections.Generic;

// A users can have only one cart that will be saved in the database until 1. items delete 2. item purchase, this is a 1:1 relationship

namespace Domain {
    public class Cart {
        public Guid Id { get; set; }
        public virtual List<CartItem> ItemsInCart { get; set; }
        public virtual AppUser AppUser { get; set; }
        public string UserId { get; set; }
        public float Total { get; set; }

        public Cart(){
            ItemsInCart = new List<CartItem>();
        }
    }
}