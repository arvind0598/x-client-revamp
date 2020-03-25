import databaseStore from './database/default-store';
import entitiesStore from './entities/default-store';
import fieldsStore from './fields/default-store';

export default {
  datasourceData: databaseStore,
  entitiesData: entitiesStore,
  fieldsData: fieldsStore,
};
