import httpServer from 'http-server';
import open from 'open';

httpServer.createServer().listen(8080, () => {
    open('http://localhost:8080');
});