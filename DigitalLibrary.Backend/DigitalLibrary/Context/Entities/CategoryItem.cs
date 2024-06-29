using DigitalLibrary.Interfaces;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DigitalLibrary.Context.Entities
{
    public class CategoryItem : IPrimaryProperties
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        public int CategoryId { get; set; }
        
        [Required(ErrorMessage = "Please select a valid item from the '{0}' dropdown list")]
        public int MediaTypeId { get; set; }

        public DateTime DateReleased { get; set; }

        [NotMapped]
        public int ContentId { get; set; }
    }
}