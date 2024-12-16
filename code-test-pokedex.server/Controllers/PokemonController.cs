using code_test_pokedex.server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;


namespace code_test_pokedex.server.Controllers
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


        ///<summary>
        /// Fetches a Pokémon based on the identifier. Could be either name or id
        /// </summary>
        [HttpGet("{identifier}")]
        public async Task<ActionResult<Pokemon>> GetPokemonByIdentifier(string identifier)
        {
            string id = identifier.Trim();
            if (!VerifyId(id))
            {
                return BadRequest("Invalid Pokémon ID");
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
                    return NotFound($"Pokémon with id: {id} could not be found");
                }
                else
                {
                    return BadRequest("Failed to fetch pokémon");
                }
            }
            catch (Exception exception)
            {
                _logger.LogError(exception.Message);
                return BadRequest(exception.Message);
            }
        }
        private static bool VerifyId(string id)
        {
            bool valid = true;

            if (string.IsNullOrEmpty(id) || string.IsNullOrWhiteSpace(id))
            {
                valid = false;
            }
            if (int.TryParse(id?.ToString(), out int identifier)
                && identifier < 1)
            {
                valid = false;
            }
            return valid;
        }

    }
}
