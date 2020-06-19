import { Application } from '../declarations';
import users from './users/users.service';
import { Id, Params } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);

  app.use("/gateway", {
    async get(id: Id, params?: Params): Promise<any> {
        return {
            'id': id,
            'message': "Gateway is successfuly working!",
            'datetime': new Date().toISOString().substr(11,8)
        };
    }
  });
}
