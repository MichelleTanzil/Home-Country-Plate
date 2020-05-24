using Persistence;

namespace API.Controllers
{
  public class ProductController : BaseController
  {
    private readonly DataContext _context;

    public ProductController(DataContext context)
    {
      _context = context;
    }
  }
}