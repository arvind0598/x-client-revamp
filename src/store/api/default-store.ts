import databaseStore from './database/default-store';
import entitiesStore from './entities/default-store';
import fieldsStore from './fields/default-store';
import relationsStore from './relations/default-store';

export default {
  datasourceData: databaseStore,
  entitiesData: entitiesStore,
  fieldsData: fieldsStore,
  relationsData: relationsStore,
};
