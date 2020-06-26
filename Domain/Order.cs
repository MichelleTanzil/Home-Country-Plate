using System;

// after a user collects a cart and pays for it, it transfers into an order object that will get stored and assosiate with a user

namespace Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public virtual Cart Purchase { get; set; }
        public DateTime BoughtOn { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}