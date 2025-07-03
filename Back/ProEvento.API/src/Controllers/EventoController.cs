using Microsoft.AspNetCore.Mvc;
using ProEvento.Application.DTOs;
using ProEvento.Application.Intefaces;
using ProEvento.Domain.Models;

namespace ProEvento.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly IEventoService _eventoService;

        public EventoController(IEventoService eventoService)
        {
            _eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEventos()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formulário!");
            }

            try
            {
                var eventosDto = await _eventoService.ObterEventosAsync(true);

                if (eventosDto == null)
                {
                    return NoContent();
                }

                //var eventosDto = new List<EventoDto>();

                return Ok(eventosDto);
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
                return BadRequest("Revise o formulário!");
            }

            try
            {
                var evento = await _eventoService.ObterEventoPorIdAsync(id, true);

                if (evento == null)
                {
                    return NoContent();
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
                return BadRequest("Revise o formulário!");
            }

            try
            {
                var evento = await _eventoService.ObterEventosPorTemaAsync(tema, true);

                if (evento == null)
                {
                    return NotFound($"Evento com o tema {tema} não foi encontrado.");
                }

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostEvento(EventoDto createEvento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formulário!");
            }

            try
            {
                var evento = await _eventoService.AddEventos(createEvento);

                if (evento == null)
                {
                    return NoContent();
                }

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvento(int id, EventoDto updateEvento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formulário!");
            }

            try
            {
                var eventoDto = await _eventoService.UpdateEventos(id, updateEvento);

                if (eventoDto == null)
                {
                    return BadRequest("Não foi possível atualizar o evento, favor revise o formulário.");
                }

                return Ok(eventoDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvento(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formulário!");
            }

            try
            {

                var evento = await _eventoService.ObterEventoPorIdAsync(id, true);
                if (evento == null) return NoContent();

                return await _eventoService.DeleteEvento(id)
                    ? Ok(new { success = true, message = "Evento Deletado" })
                    : throw new Exception("Ocorreu um erro ao tentar deletar o evento");
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Remover Evento - Erro interno do servidor: {ex.Message}");
            }
        }
    }
}
