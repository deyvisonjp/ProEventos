using Microsoft.EntityFrameworkCore;
using ProEvento.Domain.Interfaces;
using ProEvento.Domain.Models;
using ProEvento.Persistence.Data;

namespace ProEvento.Persistence.Repositories;

public class LoteRepository : ILoteRepository
{
    private readonly ProEventosContext _context;

    public LoteRepository(ProEventosContext context)
    {
        _context = context;
        //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }

    public async Task<Lote> ObterLotePorIdsAsync(int eventoId, int loteId)
    {
        IQueryable<Lote> query = _context.Lotes;

        query = query.AsNoTracking()
            .Where(lote => lote.EventoId == eventoId && lote.Id == loteId);

        return await query.FirstOrDefaultAsync();
    }

    public async Task<Lote[]> ObterLotesPorEventoIdAsync(int eventoId)
    {
        IQueryable<Lote> query = _context.Lotes;

        query = query.AsNoTracking()
            .Where(lote => lote.EventoId == eventoId);

        return await query.ToArrayAsync();
    }
}
