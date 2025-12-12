using System.Net;
using System.Net.Mail;
using WorkingMVC.Interfaces;

namespace WorkingMVC.Services
{
    public class EmailSenderService(IConfiguration config) : IEmailSenderService
    {
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var host = config["Smtp:Host"];
            var port = int.Parse(config["Smtp:Port"]);
            var user = config["Smtp:Username"];
            var pass = config["Smtp:Password"];
            var from = config["Smtp:From"];

            using var client = new SmtpClient(host, port)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(user, pass)
            };

            var mail = new MailMessage(from!, email, subject, message)
            {
                IsBodyHtml = true
            };

            await client.SendMailAsync(mail);
        }
    }
}
