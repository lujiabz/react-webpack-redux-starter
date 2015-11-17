var _ = require('underscore');

module.exports = {
	createChat:function(io){
		var users = [];

		io.sockets.on('connection', function(socket) {
			var obj = {
				name:""
			}
		  	socket.on('login',function(data){
		  		console.log(data + " connect")
		  		obj.name = data;
		  		if(!_.contains(users,data)){
		  			users.push(data);
		  		}
		  		socket.emit("users",{users:users});
		  		socket.broadcast.emit("users",{users:users})
		  	})

		  	socket.on('message',function(data){
		  		socket.emit("message",{
		  			name: obj.name,
		  			msg: data
		  		});
		  		socket.broadcast.emit("message",{
		  			name: obj.name,
		  			msg: data
		  		});
		  	})

		  	socket.on('disconnect', function() {
		  		console.log(obj.name + " disconnect");
		  		users = _.without(users,obj.name);
		  		socket.broadcast.emit("users",{users:users})
				//io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
		  	});
		});
	}
}