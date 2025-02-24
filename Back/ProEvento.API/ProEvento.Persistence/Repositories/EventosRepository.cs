using Microsoft.EntityFrameworkCore;
using ProEvento.Domain.Interfaces;
using ProEvento.Domain.Models;
using ProEvento.Persistence.Data;

namespace ProEvento.Persistence.Repositories;

public class EventosRepository : IEventosRepository
{
    private readonly ProEventosContext _context;

    public EventosRepository(ProEventosContext context)
    {
        _context = context;
        //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }
    public async Task<Evento> ObterEventoPorIdAsync(int id, bool includePalestrantes)
    {
        IQueryable<Evento> query = _context.Eventos
           .Where(e => e.Id == id)
           .Include(e => e.Lotes)
           .Include(e => e.RedesSociais);

        if (includePalestrantes)
        {
            query = query.Include(e => e.PalestrantesEventos).ThenInclude(pe => pe.Palestrante);
        }

        query = query.AsNoTracking().OrderBy(e => e.Id);

        return await query.FirstOrDefaultAsync();
    }

    public async Task<Evento[]> ObterEventosAsync(bool includePalestrantes = false)
    {
        IQueryable<Evento> query = _context.Eventos
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);

        if (includePalestrantes)
        {
            query = query.Include(e => e.PalestrantesEventos).ThenInclude(pe => pe.Palestrante);
        }

        query = query.AsNoTracking().OrderBy(e => e.Id);

        return await query.ToArrayAsync();
    }

    public async Task<Evento[]> ObterEventosPorTemaAsync(string tema, bool includePalestrantes)
    {
        IQueryable<Evento> query = _context.Eventos
            .Where(e => e.Tema.ToLower().Contains(tema.ToLower()))
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);

        if (includePalestrantes)
        {
            query = query.Include(e => e.PalestrantesEventos!).ThenInclude(pe => pe.Palestrante);
        }

        query = query.AsNoTracking().OrderBy(e => e.Id);

        return await query.ToArrayAsync();
    }
}
