namespace WorkingMVC.Interfaces
{
    public interface IImageService
    {
        public Task<string> UploadImageAsync(IFormFile file);
        public Task DeleteImageAsync(string fileName);
    }
}
 