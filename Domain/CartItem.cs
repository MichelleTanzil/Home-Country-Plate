namespace Domain
{
    public class CartItem
    {
        public int Id {get;set;}
        public virtual Product product { get; set; }
        public int quantity { get; set; }
    }
}