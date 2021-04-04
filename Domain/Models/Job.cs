using System.Text.Json.Serialization;

namespace portfolio.Domain.Models
{
    public class Job
    {
        [JsonPropertyName("id")] public string Id { get; set; }
        [JsonPropertyName("type")] public string Type { get; set; }
        [JsonPropertyName("url")] public string Url { get; set; }
        [JsonPropertyName("created_at")] public string CreatedAt { get; set; }
        [JsonPropertyName("company")] public string Company { get; set; }
        [JsonPropertyName("company_url")] public string CompanyUrl { get; set; }
        [JsonPropertyName("location")] public string Location { get; set; }
        [JsonPropertyName("title")] public string Title { get; set; }
        [JsonPropertyName("description")] public string Description { get; set; }
        [JsonPropertyName("how_to_apply")] public string HowToApply { get; set; }
        [JsonPropertyName("company_logo")] public string CompanyLogo { get; set; }
    }
}