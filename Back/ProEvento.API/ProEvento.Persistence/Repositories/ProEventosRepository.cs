﻿using ProEvento.Domain.Interfaces;
using ProEvento.Persistence.Data;

namespace ProEvento.Persistence.Repositories;

public class ProEventosRepository : IProEventosRepository
{
    private readonly ProEventosContext _context;

    public ProEventosRepository(ProEventosContext context)
    {
        _context = context;
    }

    public void Add<T>(T entity) where T : class
    {
       _context.Add(entity);
    }

    public void Update<T>(T entity) where T : class
    {
        _context.Update(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
        _context.Remove(entity);
    }

    public void DeleteRange<T>(T[] entityArray) where T : class
    {
       _context.RemoveRange(entityArray);
    }

    public async Task<bool> SaveChangesAsync()
    {
        //Se Houve alteração retorna true
        return (await _context.SaveChangesAsync()) > 0;
    }
}
