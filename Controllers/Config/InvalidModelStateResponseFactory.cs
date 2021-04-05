using Microsoft.AspNetCore.Mvc;
using portfolio.Extensions;
using portfolio.Resources;

namespace portfolio.Controllers.Config
{
    public static class InvalidModelStateResponseFactory
    {
        public static IActionResult ProduceErrorResponse(ActionContext context)
        {
            var errors = context.ModelState.GetErrorMessages();

            var response = new ErrorResource(messages: errors);

            return new BadRequestObjectResult(response);
        }
    }
}