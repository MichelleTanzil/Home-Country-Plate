using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Domain;

namespace Application.UserCart {
    public class CartDTO {
        public Guid Id { get; set; }

        [JsonPropertyName ("items")]
        public ICollection<CartItem> ItemsInCart { get; set; }
        public float Total { get; set; }
    }
}