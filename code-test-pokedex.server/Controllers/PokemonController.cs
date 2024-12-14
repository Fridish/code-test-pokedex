using code_test_pokedex.server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;


namespace pokedex_code_test.Server.Controllers
{
    [ApiController]
    [Route("api/pokemon")]
    public class PokemonController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<PokemonController> _logger;
        private readonly string _baseUrl = "https://pokeapi.co/api/v2/pokemon-form";
        public PokemonController(HttpClient httpClient, ILogger<PokemonController> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pokemon>> GetPokemonById(int id)
        {
            if (id <= 0 || id >= 1025)
            {
                return BadRequest("Invalid Pokemon ID");
            }
            try
            {
                Uri endpoint = new($"{_baseUrl}/{id}");
                //fetch all pokemon based on the id
                var response = await _httpClient.GetAsync(endpoint);

                // if status is OK, map to Pokemon object. Else, send a bad request error
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var pokemonData = JsonSerializer.Deserialize<JsonElement>(content);
                    Pokemon pokemon = new Pokemon
                    {
                        Id = pokemonData.GetProperty("id").GetInt32(),
                        Name = pokemonData.GetProperty("name").GetString()!,
                        Image = pokemonData.GetProperty("sprites").GetProperty("front_default").GetString()!
                    };

                    return Ok(pokemon);

                }
                else if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return NotFound($"Status code: 404. Pokemon with id: {id} not found");
                }
                else
                {
                    return BadRequest("Failed to fetch pokemon");
                }
            }
            catch (Exception exception)
            {
                _logger.LogError(exception.Message);
                return BadRequest(exception.Message);
            }
        }
    }
}
