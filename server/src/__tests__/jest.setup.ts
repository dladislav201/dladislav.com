import { server } from '../index'; 

afterAll(async () => {
  if (server && server.close) {
    server.close();
  }
});