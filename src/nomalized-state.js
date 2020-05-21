import { schema, normalize } from 'normalizr';

const user = new schema.Entity('users');
const locations = new schema.Entity('locations');
const terminals = new schema.Entity('terminals', { assignedTo: locations });
const boards = new schema.Entity('boards', { assignedTo: terminals });
