/**
 * Created by sai on 25/12/14.
 */
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
console.log("Number of CPUS----??",numCPUs)
if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
	console.log("kkkkkkkkkkkkkkkkk");
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });

    cluster.on('listening', function(worker, address) {
 console.log('master: listening event (worker ' + worker.id + ', pid ' + worker.process.pid + ', ' + address.address + ':' + address.port + ')');
    });

} else {
    // Workers can share any TCP connection
    // In this case its a HTTP server
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8090);
}