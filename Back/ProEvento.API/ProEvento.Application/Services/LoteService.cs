using AutoMapper;
using ProEvento.Application.DTOs;
using ProEvento.Application.Intefaces;
using ProEvento.Domain.Interfaces;
using ProEvento.Domain.Models;

namespace ProEvento.Application.Services;

public class LoteService : ILoteService
{
    private readonly IProEventosRepository _proEventosRepository;
    private readonly ILoteRepository _loteRepository;
    private readonly IMapper _mapper;
    public LoteService(IProEventosRepository proEventosRepository, ILoteRepository loteRepository, IMapper mapper)
    {
        _proEventosRepository = proEventosRepository;
        _loteRepository = loteRepository;
        _mapper = mapper;
    }

    public async Task AddLote(int eventoId, LoteDto loteModel)
    {
        try
        {
            var lote = _mapper.Map<Lote>(loteModel);
            lote.EventoId = eventoId;

            _proEventosRepository.Add<Lote>(lote);

            await _proEventosRepository.SaveChangesAsync();
         
        }
        catch (Exception ex)
        {
            throw new Exception($"Erro ao tentar adicionar o Evento - Erro: {ex}");
        }
    }

    public async Task<bool> DeleteLote(int eventoId, int loteId)
    {
        try
        {
            var lote = await _loteRepository.ObterLotePorIdsAsync(eventoId, loteId);

            if (lote == null) throw new Exception("Lote para delete não encontrado!");

            _proEventosRepository.Delete<Lote>(lote);

            return await _proEventosRepository.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<LoteDto> ObterLotePorIdsAsync(int eventoId, int loteId)
    {
        try
        {
            var lote = await _loteRepository.ObterLotePorIdsAsync(eventoId, loteId);

            if (lote != null) return null;

            var resultado = _mapper.Map<LoteDto>(lote);
            return resultado;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<LoteDto[]> ObterLotesPorEventoIdAsync(int eventoId)
    {
        try
        {
            var lotes = await _loteRepository.ObterLotesPorEventoIdAsync(eventoId);

            if (lotes == null) return null;

            var resultado = _mapper.Map<LoteDto[]>(lotes);
            return resultado;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<LoteDto[]> SalvaLotes(int eventoId, LoteDto[] models)
    {
        try
        {
            var lotes = await _loteRepository.ObterLotesPorEventoIdAsync(eventoId);

            if (lotes == null) return null;
            
            foreach (var loteModel in models)
            {
                if (loteModel.Id == 0)
                {
                    await AddLote(eventoId, loteModel);
                }
                else
                {
                    var lote = lotes.FirstOrDefault(lote => lote.Id == loteModel.Id);
                    loteModel.EventoId = eventoId;
                    _mapper.Map(loteModel, lote);
                    _proEventosRepository.Update<Lote>(lote);
                    await _proEventosRepository.SaveChangesAsync();
                }
            }

            var resultado = _mapper.Map<LoteDto[]>(lotes);
            return resultado;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}
