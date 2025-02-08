using System.Threading;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEvento.API.Data;
using ProEvento.API.Models;

namespace ProEvento.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {                
        private readonly DataContext _context;

        public EventoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetEvento")]
        public IEnumerable<Evento> Get()
        {
            return _context.Eventos;
        }

        [HttpGet("{id}")]
        public Evento GetById(int id)
        {
            var eventoPorId = _context.Eventos.FirstOrDefault(evento => evento.EventoId == id);

            //if (eventoPorId == null)
            //{
            //    return "Não foi encontrado nenhum evento com esse ID";
            //}

            return eventoPorId;
        }
    }
}
