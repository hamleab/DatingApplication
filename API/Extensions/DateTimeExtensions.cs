namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateOnly dob) // this is a static method
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow); // get today's date
            var age = today.Year - dob.Year;
            if (dob > today.AddYears(-age)) age--; // if the date of birth is greater than today's date minus the age, then subtract 1 from the age
            return age;
        }
    }
}