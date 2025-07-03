using ProEvento.Domain.Models;

namespace ProEvento.Domain.Interfaces;

public interface ILoteRepository
{
    /// <summary>
    ///  Metodo que retornará uma lista de lotes por eventoId.
    /// </summary>
    /// <param name="eventoId">Código chabe da tabela Evento</param>
    /// <returns>Lista de Lotes</returns>
    Task<Lote[]> ObterLotesPorEventoIdAsync(int eventoId);
    
    /// <summary>
    /// Método get que retornará apenas 1 lote
    /// </summary>
    /// <param name="eventoId">Código chave da tabela Evento</param>
    /// <param name="loteId">Código chave do meu lote</param>
    /// <returns>Apenas um Lote</returns>
    Task<Lote> ObterLotePorIdsAsync(int eventoId, int loteId);
}
