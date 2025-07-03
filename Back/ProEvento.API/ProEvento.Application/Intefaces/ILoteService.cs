using ProEvento.Application.DTOs;

namespace ProEvento.Application.Intefaces;
public interface ILoteService
{
    Task<LoteDto[]> SalvaLotes(int eventoId, LoteDto[] models);
    Task<bool> DeleteLote(int eventoId, int loteId);
    Task<LoteDto[]> ObterLotesPorEventoIdAsync(int loteId);
    Task<LoteDto> ObterLotePorIdsAsync(int eventoId, int loteId);
}
