using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if(await context.Users.AnyAsync()) return; // if there are any users in the database, then return
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json"); // read the json file
            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true}; // create a new instance of the JsonSerializerOptions class
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options); // deserialize the json file into a list of AppUser objects
            foreach (var user in users) // loop through the list of users
            {
                using var hmac = new HMACSHA512(); // create a new instance of the HMACSHA512 class
                user.UserName = user.UserName.ToLower(); // convert the username to lowercase
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")); // compute the hash of the password
                user.PasswordSalt = hmac.Key; // set the password salt
                context.Users.Add(user); // add the user to the database
            }
            await context.SaveChangesAsync(); // save the changes to the database   
        }
    }
}