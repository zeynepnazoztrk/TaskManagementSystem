namespace TaskManagement.API.Mapping;

using AutoMapper;
using TaskManagement.API.Models;
using TaskManagement.API.DTOs;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // User Mapping
        CreateMap<User, UserDto>();
        CreateMap<CreateUserDto, User>();
        CreateMap<UpdateUserDto, User>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        // Category Mapping
        CreateMap<Category, CategoryDto>();
        CreateMap<CreateCategoryDto, Category>();
        CreateMap<UpdateCategoryDto, Category>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        // TaskItem Mapping
        CreateMap<TaskItem, TaskItemDto>().ForMember(dest => dest.CategoryName,opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : null));
        CreateMap<CreateTaskDto, TaskItem>();
        // CreateMap<UpdateTaskDto, TaskItem>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        CreateMap<UpdateTaskDto, TaskItem>()
            .ForMember(dest => dest.Priority, opt => opt.Ignore())
            .ForMember(dest => dest.Status, opt => opt.Ignore())
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        // TaskAttachment Mapping
        CreateMap<TaskAttachment, TaskAttachmentDto>();

        // TaskComment Mapping
        CreateMap<TaskComment, TaskCommentDto>();
    }
}