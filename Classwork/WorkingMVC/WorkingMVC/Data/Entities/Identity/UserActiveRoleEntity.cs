namespace WorkingMVC.Data.Entities.Identity
{
    public class UserActiveRoleEntity
    {
        public bool IsActive { get; set; } = false;

        public string Role { get; set; } = string.Empty;
    }
}
