using Microsoft.AspNetCore.Http;

namespace Core.Interfaces;

public interface IImageService
{
    Task<string> UploadImageAsync(IFormFile file);
    void DeleteImage(string fileName);
    string GetDefaultUserImage();
}
