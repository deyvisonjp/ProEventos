using Microsoft.AspNetCore.Mvc;
using ProEvento.Application.Intefaces;
using ProEvento.Application.Services;
using ProEvento.Domain.Models;
using System.Threading.Tasks;

namespace ProEvento.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly IEventosServices _eventoService;

        public EventoController(IEventosServices eventoService)
        {
            _eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEventos()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formul�rio!");
            }

            try
            {
                var eventos = await _eventoService.ObterEventosAsync(true);

                if (eventos == null)
                {
                    return NotFound("N�o foram encontrados eventos cadastrados.");
                }

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Evento>> GetEventoById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formul�rio!");
            }

            try
            {
                var evento = await _eventoService.ObterEventoPorIdAsync(id, true);

                if (evento == null)
                {
                    return NotFound($"Evento com ID {id} n�o foi encontrado.");
                }

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpGet("tema/{tema}")]
        public async Task<ActionResult<Evento>> GetEventoByTema(string tema)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formul�rio!");
            }

            try
            {
                var evento = await _eventoService.ObterEventosPorTemaAsync(tema, true);

                if (evento == null)
                {
                    return NotFound($"Evento com o tema {tema} n�o foi encontrado.");
                }

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostEvento(Evento createEvento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formul�rio!");
            }

            try
            {
                var evento = await _eventoService.AddEventos(createEvento);

                if (evento == null)
                {
                    return BadRequest("N�o foi poss�vel criar o evento, favor revise o formul�rio.");
                }

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvento(int id, Evento updateEvento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formul�rio!");
            }

            try
            {
                var evento = await _eventoService.UpdateEventos(id, updateEvento);

                if (evento == null)
                {
                    return BadRequest($"N�o foi poss�vel atualizar o evento, favor revise o forumul�rio.");
                }

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Atualizar Elemento -Erro interno do servidor: {ex.Message}");
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvento(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formul�rio!");
            }

            try
            {
                return await _eventoService.DeleteEvento(id) 
                    ? Ok("Evento Deletado")
                    : BadRequest($"Evento n�o encontrado.");
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Remover Evento - Erro interno do servidor: {ex.Message}");
            }
        }
    }
}
