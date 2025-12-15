using System.ComponentModel.DataAnnotations;
using WorkingMVC.Data.Entities.Identity;

namespace WorkingMVC.Areas.Admin.Models.Users
{
    public class UserEditModel
    {
        [Display(Name = "#")]
        public int Id { get; set; }
        [Display(Name = "ПІБ")]
        public string FullName { get; set; } = string.Empty;
        [Display(Name = "Електронна адреса")]
        public string Email { get; set; } = string.Empty;
        public string[] AllRoles { get; } = Constants.Roles.AllRoles;
        public List<UserActiveRoleEntity>? AllActiveRoles { get; set; } = new List<UserActiveRoleEntity>();

        public UserEditModel()
        {
            foreach (var role in AllRoles)
            {
                AllActiveRoles!.Add(new UserActiveRoleEntity
                {
                    IsActive = false,
                    Role = role
                });
            }
        }
    }
}
