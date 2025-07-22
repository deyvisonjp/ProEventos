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
        private readonly IWebHostEnvironment _hostEnvironment;

        public EventoController(IEventoService eventoService, IWebHostEnvironment hostEnvironment)
        {
            _eventoService = eventoService;
            _hostEnvironment = hostEnvironment;
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

        [HttpPost("upload-image/{eventoId}")]
        public async Task<IActionResult> UploadImage(int eventoId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Revise o formulário!");
            }

            try
            {
                var evento = await _eventoService.ObterEventoPorIdAsync(eventoId, true);

                if (evento == null)
                {
                    return NoContent();
                }

                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    DeleteImage(evento.ImagemUrl);
                    evento.ImagemUrl = await SaveImage(file);
                }

                var eventoRetorno = await _eventoService.UpdateEventos(eventoId, evento);
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

                if (await _eventoService.DeleteEvento(id))
                {
                    DeleteImage(evento.ImagemUrl);
                    return Ok(new { success = true, message = "Evento Deletado" });
                }
                else
                {
                    throw new Exception("Ocorreu um erro ao tentar deletar o evento");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Remover Evento - Erro interno do servidor: {ex.Message}");
            }
        }

        //Não poderá ser acessado fora da API (NonAction)
        [NonAction]
        private void DeleteImage(string imagemUrl)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/Images", imagemUrl);

            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }

        [NonAction]
        private async Task<string> SaveImage(IFormFile file)
        {
            string imageName = new string(Path
                .GetFileNameWithoutExtension(file.FileName)
                .Take(10)
                .ToArray()
                ).Replace(' ', '-');

            imageName = $"{imageName}_{DateTime.UtcNow:yyMMddHHmmss}{Path.GetExtension(file.FileName)}";

            // Caminho físico onde será salva a imagem
            var imageFolder = Path.Combine(_hostEnvironment.ContentRootPath, "Resources", "Images");

            if (!Directory.Exists(imageFolder))
                Directory.CreateDirectory(imageFolder);

            var imagePath = Path.Combine(imageFolder, imageName);

            // Salva a imagem fisicamente
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return imageName;
        }
    }
}
