$(document).ready(function() {
	var socket = io.connect();
	var from = $.cookie('user'); //read user name form client's cookie
	var to = 'all'; //to all users
	//send user's online information to all
	socket.emit('online', {user: from});
	scoket.on('online', function(data) {
		if (data.user != from) {
			var sys = '<div style="color: #f00">System(' + Date.now() + '):' + 'user' + data.user + 'is online! </div>';
		} else {
			var sys = '<div style="color: #f00">System(' + Date.now() + '): you are in the chatroom! </div>';
		}
		$("#contens").append(sys + "<br/>"); 
		//refresh users list
		flushUsers(data.users);
		showSayTo();
	});

	var flushUsers = function(users) {
		//empty and add ALL in the userlist
		$("#list").empty().append('<li title="double click to chat" alt="all" class="sayingto" onselectstart="return false"> ALL </li>');
		//generate all users online
		for(var i in users) {
			$("#list").append('<li alt="' + users[i] + '" title="double click to chat" + onselectstart="return false">' + users[i] + '</li>');
		}
		//dbclick to chat with
		$("#list > li").dbclick(function(){
			if ($(this).attr('alt') != from) {
				to = $(this).attr('alt');
				$("#this > li").removeClass('sayingto');
				$(this).addClass('sayingto');
				showSayto();
			}
		});
	}

	function showSayTo() {
		$("#from").html(from);
		$("#to").html((to == "all") ? "ALL" : to);
	}


});



	
