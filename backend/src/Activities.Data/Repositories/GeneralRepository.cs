using System.Collections.Generic;
using System.Threading.Tasks;
using Activities.Data.Context;
using Activities.Domain.Interfaces.Repositories;

namespace Activities.Data.Repositories
{
    public class GeneralRepository : IGeneralRepository
    {
        private readonly DataContext _dataContext;

        public GeneralRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _dataContext.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _dataContext.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }

        public void DeleteMany<T>(IEnumerable<T> entities) where T : class
        {
            _dataContext.RemoveRange(entities);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}