﻿using ProEvento.Domain.Models;

namespace ProEvento.Domain.Interfaces;

public interface IEventoRepository
{
    Task<Evento[]> ObterEventosPorTemaAsync(string tema, bool includePalestrantes = false);
    Task<Evento[]> ObterEventosAsync(bool includePalestrantes = false);
    Task<Evento> ObterEventoPorIdAsync(int id, bool includePalestrantes);
}
