using ProEvento.Domain.Models;

namespace ProEvento.Application.Intefaces;
public interface IEventosServices
{
    Task<Evento> AddEventos(Evento eventoModel);
    Task<Evento> UpdateEventos(int eventoId, Evento eventoModel);
    Task<bool> DeleteEvento(int eventoId);
    Task<Evento[]> ObterEventosAsync(bool includePalestrantes);
    Task<Evento> ObterEventoPorIdAsync(int id, bool includePalestrantes);
    Task<Evento[]> ObterEventosPorTemaAsync(string tema, bool includePalestrantes);
}
