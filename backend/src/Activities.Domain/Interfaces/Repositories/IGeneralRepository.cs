using System.Collections.Generic;
using System.Threading.Tasks;

namespace Activities.Domain.Interfaces.Repositories
{
    public interface IGeneralRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteMany<T>(IEnumerable<T> entities) where T : class;

        Task<bool> SaveChangesAsync();
    }
}