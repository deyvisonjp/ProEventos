using AutoMapper;
using ProEvento.Application.DTOs;
using ProEvento.Domain.Models;

namespace ProEvento.API.Helpers
{
    public class ProEventosProfile : Profile
    {
        public ProEventosProfile() 
        {
            CreateMap<Evento, EventoDto>();
        }
    }
}
