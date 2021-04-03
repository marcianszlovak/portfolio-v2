using System.Text.Json.Serialization;

namespace portfolio.Domain.Models
{
    public class Job
    {
        [JsonPropertyName("id")] public string Id { get; set; }
        [JsonPropertyName("type")] public string Type { get; set; }
        [JsonPropertyName("title")] public string Title { get; set; }
    }
}