﻿using ProEvento.Domain.Models;

namespace ProEvento.Application.DTOs;
public class RedeSocialDto
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string URL { get; set; }
    public int? EventoId { get; set; }
    public Evento? Evento { get; set; }
    public int? PalestranteId { get; set; }
    public Palestrante? Palestrante { get; set; }
}
