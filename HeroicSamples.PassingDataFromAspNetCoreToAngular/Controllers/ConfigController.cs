using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace HeroicSamples.PassingDataFromAspNetCoreToAngular.Controllers
{
    [ApiController, Route("api/config")]
    public class ConfigController : Controller
    {
        private readonly IConfiguration _config;

        public ConfigController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet("")]
        public IActionResult Get()
        {
            var targetSection = "customerSettings";
            //The magic happens here! 
            return Ok(_config.GetSection(targetSection)
                .AsEnumerable()
                .Where(x => x.Key != targetSection)
                // Since we are enumerating the root, 
                // each key will be prefixed with our 
                // target section, so we need to strip
                // that prefix off.
                .ToDictionary(x => x.Key.RemoveStart($"{targetSection}:"), x => x.Value));
        }
    }

    public static class StringExtensions
    {
        public static string RemoveStart(this string target, string value)
        {
            if (target.StartsWith(value))
            {
                return target.Substring(value.Length);
            }

            return target;
        }
    }
}
