using Microsoft.EntityFrameworkCore;
using ProEvento.Domain.Interfaces;
using ProEvento.Domain.Models;
using ProEvento.Persistence.Data;

namespace ProEvento.Persistence.Repositories;

public class PalestranteRepository : IPalestrantesRepository
{
    private readonly ProEventosContext _context;

    public PalestranteRepository(ProEventosContext context)
    {
        _context = context;
    }

    public async Task<Palestrante> ObterPalestrantePorIdAsync(int palestranteId, bool includeEventos)
    {
        IQueryable<Palestrante> query = _context.Palestrantes
           .Where(p => p.Id == palestranteId)
           .Include(p => p.RedeSociais);

        if (includeEventos)
        {
            query = query.Include(p => p.PalestrantesEventos).ThenInclude(e => e.Evento);
        }

        query = query.OrderBy(p => p.Id);

        return await query.FirstOrDefaultAsync();
    }

    public Task<Palestrante> ObterPalestrantePorIdAsync(string palestranteId, bool includeEventos)
    {
        throw new NotImplementedException();
    }

    public async Task<List<Palestrante>> ObterPalestrantesAsync(bool includeEventos = false)
    {
        IQueryable<Palestrante> query = _context.Palestrantes
          .Include(p => p.RedeSociais);

        if (includeEventos)
        {
            query = query.Include(p => p.PalestrantesEventos).ThenInclude(e => e.Evento);
        }

        query = query.OrderBy(p => p.Id);

        return await query.ToListAsync();
    }

    public async Task<Palestrante[]> ObterPalestrantesPorNomeAsync(string nome, bool includeEventos)
    {
        IQueryable<Palestrante> query = _context.Palestrantes
            .Where(p => p.Nome.ToLower().Contains(nome.ToLower()))
            .Include(p => p.RedeSociais);

        if (includeEventos)
        {
            query = query.Include(p => p.PalestrantesEventos).ThenInclude(e => e.Evento);
        }

        query = query.OrderBy(p => p.Id);

        return await query.ToArrayAsync();
    }
}
