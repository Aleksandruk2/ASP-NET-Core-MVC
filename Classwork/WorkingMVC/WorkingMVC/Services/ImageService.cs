using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp;
using WorkingMVC.Interfaces;
using SixLabors.ImageSharp.Formats.Webp;

namespace WorkingMVC.Services
{
    public class ImageService(IConfiguration configuration) : IImageService
    {
        public async Task<string> UploadImageAsync(IFormFile file)
        {
            try
            {
                using var stream = new MemoryStream();
                await file.CopyToAsync(stream);
                string fileName = Path.GetRandomFileName() + ".webp";
                var bytes = stream.ToArray();
                using var image = Image.Load(bytes);
                image.Mutate(imgc =>
                {
                    imgc.Resize(new ResizeOptions
                    {
                        Size = new Size(600,600),
                        Mode = ResizeMode.Max
                    });
                });

                var dirImageName = configuration["DirImageName"] ?? "images";
                var path = Path.Combine(Directory.GetCurrentDirectory(), dirImageName, fileName);
                await image.SaveAsync(path, new WebpEncoder());
                return fileName;
            }
            catch
            {
                return String.Empty;
            }
        }

        public async Task DeleteImageAsync(string fileName)
        {
            var dirImageName = configuration["DirImageName"] ?? "images";
            string path = Path.Combine(Directory.GetCurrentDirectory(), dirImageName, fileName);

            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }    
    }
}
