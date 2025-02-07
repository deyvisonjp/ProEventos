using System.Threading;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEvento.API.Models;

namespace ProEvento.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {

        public IEnumerable<Evento> _evento = new Evento[]
            {
                new Evento()
                {
                    EventoId = 1,
                    Local = "Belo Horizonte",
                    DataEvento = DateTime.Now.AddDays(2).ToString(),
                    Tema = "Angular 11 e .NET 5",
                    QuantidadeDePessoas = 250,
                    Lote = "1º Lote",
                    ImagemUrl= "C:fotoTeste.png"
                },
                new Evento()
                {
                    EventoId = 2,
                    Local = "Belo Horizonte",
                    DataEvento = DateTime.Now.AddDays(2).ToString(),
                    Tema = "Angular 11 e .NET 5",
                    QuantidadeDePessoas = 250,
                    Lote = "1º Lote",
                    ImagemUrl= "C:fotoTeste.png"
                },
            };
        public EventoController()
        {
        }

        [HttpGet(Name = "GetEvento")]
        public IEnumerable<Evento> Get()
        {
            return _evento;
        }

        [HttpGet("{id}")]
        public Evento GetById(int id)
        {
            return _evento.FirstOrDefault(evento => evento.EventoId == id);
        }
    }
}
