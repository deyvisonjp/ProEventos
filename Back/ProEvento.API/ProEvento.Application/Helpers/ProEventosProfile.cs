using AutoMapper;
using ProEvento.Application.DTOs;
using ProEvento.Domain.Models;

namespace ProEvento.API.Helpers
{
    public class ProEventosProfile : Profile
    {
        public ProEventosProfile() 
        {
            CreateMap<Evento, EventoDto>().ReverseMap();

            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteDto>().ReverseMap();
        }
    }
}
