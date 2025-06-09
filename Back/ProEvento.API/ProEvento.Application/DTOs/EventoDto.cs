using System.ComponentModel.DataAnnotations;

namespace ProEvento.Application.DTOs;

public class EventoDto
{
    public int Id { get; set; }
    public string Local { get; set; }
    public string DataEvento { get; set; }

    [StringLength(50, MinimumLength = 3, ErrorMessage = "{0} deve ter de 3 a 50 caracteres.")]
    public string Tema { get; set; }
    
    [Display(Name = "Quantidade de pessoas")]
    [Range(1, 5000, ErrorMessage ="{0}, não pode ser menor que 1 e maior que 5.000")]
    public int QuantidadeDePessoas { get; set; }
    
    [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", 
        ErrorMessage = "Não é uma imagem válida, verifique o formato e tente novamente!")]
    public string ImagemUrl { get; set; }

    [Required(ErrorMessage = "O {0} é obrigatório.")]
    [Phone(ErrorMessage = "O {0} não esta no formato correto, corrija e tente novamente!")]
    public string Telefone { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    [Display(Name = "e-mail")]
    [EmailAddress(ErrorMessage = "O campo {0} não está no formato esperado.")]
    public string Email { get; set; }
    public IEnumerable<LoteDto>? Lotes { get; set; }
    public IEnumerable<RedeSocialDto>? RedesSociais { get; set; }
    public IEnumerable<PalestranteDto>? Palestrantes { get; set; }
}
