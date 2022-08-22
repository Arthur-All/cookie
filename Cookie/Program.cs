global using Cookie.Data;
global using Microsoft.EntityFrameworkCore;
using Cookie.HubConfig;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;
using System.Net.Http;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.]

 //@Arthur
builder.Services.AddAuthentication(opt=> //@Arthur JWT
    {
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })  .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = true, //validate if Issuer is the server that created the token
            ValidateAudience = true, //the receiver of the token is valid receiver 
            ValidateLifetime = true, //checks if the token has expired 
            ValidateIssuerSigningKey = true,//checks if the token is valied and "reliable" 

            ValidIssuer = "http://localhost:7006/",
            ValidAudience = "http://localhost:7006/",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Password#123GGEz)&*(777%$FazSol"))//@ superScretKey@345
        };
    });
builder.Services.AddSignalR();//@arthur
builder.Services.AddControllers();
builder.Services.AddCors(options => options.AddPolicy(name: "FoodListOrigins",
    policy => 
    {
        policy
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        .WithOrigins("http://localhost:4200");
    }));
builder.Services.AddDbContext<DataContext>(options =>
options.UseSqlServer("Data Source=DESKTOP-I618E02;Initial Catalog=FoodList;Integrated Security=True"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FoodListOrigins");

app.UseHttpsRedirection();

app.UseAuthentication();//@Arthur

app.UseAuthorization();

app.MapHub<MyHub>("/chat");

app.MapControllers();

app.Run();


