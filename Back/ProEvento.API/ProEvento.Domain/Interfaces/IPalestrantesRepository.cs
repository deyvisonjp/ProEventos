using ProEvento.Domain.Models;

namespace ProEvento.Domain.Interfaces;
public interface IPalestrantesRepository
{
    Task<Palestrante[]> ObterPalestrantesPorNomeAsync(string nome, bool includeEventos = false);
    Task<List<Palestrante>> ObterPalestrantesAsync(bool includeEventos = false);
    Task<Palestrante> ObterPalestrantePorIdAsync(string palestranteId, bool includeEventos);
}
