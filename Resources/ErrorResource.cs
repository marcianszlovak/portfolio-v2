using System.Collections.Generic;

namespace portfolio.Resources
{
    public class ErrorResource
    {
        public bool Success => false;
        private List<string> Messages { get; set; }

        public ErrorResource(List<string> messages)
        {
            Messages = messages ?? new List<string>();
        }

        public ErrorResource(string message)
        {
            Messages = new List<string>();

            if (!string.IsNullOrWhiteSpace(message))
            {
                Messages.Add(message);
            }
        }
    }
}