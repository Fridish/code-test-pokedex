namespace code_test_pokedex.server.Models
{
    public class Pokemon
    {
        public required int Id { get; set; }
        public required string Name { get; set; } = string.Empty!;
        public required string Image { get; set; } = string.Empty!;
    }
}

