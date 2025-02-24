using ProEvento.Application.Intefaces;
using ProEvento.Domain.Interfaces;
using ProEvento.Domain.Models;

namespace ProEvento.Application.Services;

public class EventosServices : IEventosServices
{
    private readonly IProEventosRepository _proEventosRepository;
    private readonly IEventosRepository _eventosRepository;
    public EventosServices(IProEventosRepository proEventosRepository, IEventosRepository eventosRepository)
    {
        _proEventosRepository = proEventosRepository;
        _eventosRepository = eventosRepository;
    }
    public async Task<Evento> AddEventos(Evento eventoModel)
    {
        try
        {
            _proEventosRepository.Add<Evento>(eventoModel);
            if (await _proEventosRepository.SaveChangesAsync()) 
            {
                return await _eventosRepository.ObterEventoPorIdAsync(eventoModel.Id, false);
            }

            return null;
        }
        catch (Exception ex) 
        {
            throw new Exception($"Erro ao tentar adicionar o Evento - Erro: {ex}");
        }
    }
    public async Task<Evento[]> ObterEventosAsync(bool includePalestrantes)
    {
        try
        {
            var eventos = await _eventosRepository.ObterEventosAsync(includePalestrantes);
            if (eventos == null) return null;
            return eventos;
        }
        catch (Exception ex) 
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Evento> ObterEventoPorIdAsync(int id, bool includePalestrantes)
    {
        try
        {
            var evento = await _eventosRepository.ObterEventoPorIdAsync(id, includePalestrantes);
            if (evento == null) return null;
            return evento;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Evento[]> ObterEventosPorTemaAsync(string tema, bool includePalestrantes)
    {
        try
        {
            var eventos = await _eventosRepository.ObterEventosPorTemaAsync(tema, includePalestrantes);
            if (eventos == null) return null;
            return eventos;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Evento> UpdateEventos(int eventoId, Evento eventoUpdate)
    {
        try
        {
            var evento = await _eventosRepository.ObterEventoPorIdAsync(eventoId, false);

            if (evento == null) return null;

            _proEventosRepository.Update(eventoUpdate);

            if (await _proEventosRepository.SaveChangesAsync())
            {
                return await _eventosRepository.ObterEventoPorIdAsync(evento.Id, false);
            }

            return null;
        }
        catch (Exception ex) { throw new Exception($"Erro ao tentar adicionar o Evento - Erro: {ex}"); }
    }

    public async Task<bool> DeleteEvento(int eventoId)
    {
        try
        {
            var eventoDelete = await _eventosRepository.ObterEventoPorIdAsync(eventoId, false);
            if (eventoDelete == null) throw new Exception("Evento para delete não encontrado.");

            _proEventosRepository.Delete<Evento>(eventoDelete);

            return await _proEventosRepository.SaveChangesAsync();

        }
        catch (Exception ex) { throw new Exception($"Erro ao tentar adicionar o Evento - Erro: {ex}"); }
    }
}
