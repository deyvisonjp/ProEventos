using Microsoft.AspNetCore.Mvc;
using ProEvento.Application.DTOs;
using ProEvento.Application.Intefaces;
using ProEvento.Domain.Models;

namespace ProEvento.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoteController : ControllerBase
    {
        private readonly ILoteService _loteService;

        public LoteController(ILoteService loteService)
        {
            _loteService = loteService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lote>> GetLoteById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formulário!");
            }

            try
            {
                var lotes = await _loteService.ObterLotesPorEventoIdAsync(id);

                if (lotes == null)
                {
                    return NoContent();
                }

                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }
                
        [HttpPut("{loteId}")]
        public async Task<IActionResult> SaveLotes(int loteId, LoteDto[] models)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formulário!");
            }

            try
            {
                var loteDto = await _loteService.SalvaLotes(loteId, models);

                if (loteDto == null)
                {
                    return NoContent();
                }

                return Ok(loteDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpDelete("{eventoId}/{loteId}")]
        public async Task<IActionResult> DeleteLote(int eventoId, int loteId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formulário!");
            }

            try
            {

                var lote = await _loteService.ObterLotePorIdsAsync(eventoId, loteId);
                if (lote == null) return NoContent();

                return await _loteService.DeleteLote(lote.EventoId, lote.Id)
                    ? Ok(new { success = true, message = "Lote Deletado" })
                    : throw new Exception("Ocorreu um erro ao tentar deletar o lote");
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Remover Lote - Erro interno do servidor: {ex.Message}");
            }
        }
    }
}
