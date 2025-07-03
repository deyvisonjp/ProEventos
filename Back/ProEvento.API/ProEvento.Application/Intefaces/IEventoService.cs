using ProEvento.Application.DTOs;

namespace ProEvento.Application.Intefaces;
public interface IEventoService
{
    Task<EventoDto> AddEventos(EventoDto eventoModel);
    Task<EventoDto> UpdateEventos(int eventoId, EventoDto eventoModel);
    Task<bool> DeleteEvento(int eventoId);
    Task<EventoDto[]> ObterEventosAsync(bool includePalestrantes);
    Task<EventoDto> ObterEventoPorIdAsync(int id, bool includePalestrantes);
    Task<EventoDto[]> ObterEventosPorTemaAsync(string tema, bool includePalestrantes);
}
