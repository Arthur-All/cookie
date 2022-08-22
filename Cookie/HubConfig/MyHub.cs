using Microsoft.AspNetCore.SignalR;

namespace Cookie.HubConfig
{
    public class MyHub : Hub
    {
        public async Task Send(string msgBody)
        {
            await Clients.All.SendAsync("Receive", msgBody);
        }

        public async Task sendMsg(string usuario, string msg)
        {
            await Clients.All.SendAsync("ReceiveMessage", usuario, msg);
        }



    }
}
