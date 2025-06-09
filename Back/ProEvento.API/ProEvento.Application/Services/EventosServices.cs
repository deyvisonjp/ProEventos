using AutoMapper;
using Microsoft.Extensions.Logging;
using ProEvento.Application.DTOs;
using ProEvento.Application.Intefaces;
using ProEvento.Domain.Interfaces;
using ProEvento.Domain.Models;

namespace ProEvento.Application.Services;

public class EventosServices : IEventosServices
{
    private readonly IProEventosRepository _proEventosRepository;
    private readonly IEventosRepository _eventosRepository;
    private readonly IMapper _mapper;
    public EventosServices(IProEventosRepository proEventosRepository, IEventosRepository eventosRepository, IMapper mapper)
    {
        _proEventosRepository = proEventosRepository;
        _eventosRepository = eventosRepository;
        _mapper = mapper;
    }
    public async Task<EventoDto> AddEventos(EventoDto eventoModel)
    {
        try
        {
            var evento = _mapper.Map<Evento>(eventoModel);
            _proEventosRepository.Add<Evento>(evento);

            if (await _proEventosRepository.SaveChangesAsync()) 
            {
                var eventoRetorno = await _eventosRepository.ObterEventoPorIdAsync(evento.Id, false);

                return _mapper.Map<EventoDto>(eventoRetorno);
            }

            return null;
        }
        catch (Exception ex) 
        {
            throw new Exception($"Erro ao tentar adicionar o Evento - Erro: {ex}");
        }
    }
    public async Task<EventoDto[]> ObterEventosAsync(bool includePalestrantes)
    {
        try
        {
            var eventos = await _eventosRepository.ObterEventosAsync(includePalestrantes);
            if (eventos == null) return null;

            EventoDto[] eventoDto = _mapper.Map<EventoDto[]>(eventos);

            return eventoDto;
        }
        catch (Exception ex) 
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<EventoDto> ObterEventoPorIdAsync(int id, bool includePalestrantes)
    {
        try
        {
            Evento evento = await _eventosRepository.ObterEventoPorIdAsync(id, includePalestrantes);
            if (evento == null) return null;

            EventoDto eventoDto = _mapper.Map<EventoDto>(evento);

            return eventoDto;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<EventoDto[]> ObterEventosPorTemaAsync(string tema, bool includePalestrantes)
    {
        try
        {
            var eventos = await _eventosRepository.ObterEventosPorTemaAsync(tema, includePalestrantes);
            if (eventos == null) return null;
            EventoDto[] eventoDto = _mapper.Map<EventoDto[]>(eventos);

            return eventoDto;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<EventoDto> UpdateEventos(int eventoId, EventoDto eventoUpdate)
    {
        try
        {
            var evento = await _eventosRepository.ObterEventoPorIdAsync(eventoId, false);

            if (evento == null) return null;

            _mapper.Map(eventoUpdate, evento);

            _proEventosRepository.Update(evento);

            if (await _proEventosRepository.SaveChangesAsync())
            {
                var eventoRetorno = await _eventosRepository.ObterEventoPorIdAsync(evento.Id, false);
                return _mapper.Map<EventoDto>(eventoRetorno);
            }

            return null;
        }
        catch (Exception ex)
        {
            throw new Exception($"Erro ao tentar atualizar o Evento - Erro: {ex.Message}");
        }
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
